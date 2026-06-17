import api from './api';

const defaultCompanies = [
  {
    company_id: 'wysele',
    company_name: 'Wysele Technologies',
    website_url: 'https://wysele.com',
    company_email: 'info@wysele.com',
    company_representative: 'Wysele Representative',
    description: 'Wysele Technologies Private Limited is a premier IT consulting company.',
    address: 'Hyderabad, India',
    is_active: true
  },
  {
    company_id: 'orbintix',
    company_name: 'Orbintix Technologies',
    website_url: 'https://orbintix.com',
    company_email: 'info@orbintix.com',
    company_representative: 'Orbintix Representative',
    description: 'Orbintix Technologies is a premier cloud engineering company.',
    address: 'Hyderabad, India',
    is_active: true
  },
  {
    company_id: 'gracevirtue',
    company_name: 'Grace Virtue Technologies',
    website_url: 'https://gracevirtue.com',
    company_email: 'info@gracevirtue.com',
    company_representative: 'Grace Virtue Representative',
    description: 'Grace Virtue Technologies is an IT consulting and solutions provider.',
    address: 'Hyderabad, India',
    is_active: true
  }
];

const mapCompany = (c) => {
  let domain = c.domain || '';
  if (!domain && c.website_url) {
    domain = c.website_url.replace(/https?:\/\/(www\.)?/, '').split('/')[0];
  }
  let emailDomain = c.email_domain || '';
  if (!emailDomain && c.company_email) {
    emailDomain = c.company_email.includes('@') ? c.company_email.split('@')[1] : c.company_email;
  }
  return {
    ...c,
    id: c.company_id || c.id || c._id || '',
    company_id: c.company_id || c.id || c._id || '',
    company_name: c.company_name || c.name || '',
    company_type: c.company_type || 'Pvt Ltd',
    company_email: c.company_email || (emailDomain ? `info@${emailDomain}` : ''),
    description: c.description || '',
    website_url: c.website_url || c.domain_link || '',
    company_representative: c.company_representative || c.responsible_person || '',
    documents: c.documents || '',
    address: c.address || '',
    is_active: c.is_active === true || c.is_active === 'true' || c.is_active === 1 || c.is_active === '1' || c.is_active === 'Active',

    // Keep legacy fields so we don't break anything unexpectedly
    name: c.company_name || c.name || '',
    domain: domain,
    email_domain: emailDomain,
    domain_link: c.website_url || c.domain_link || '',
    responsible_person: c.company_representative || c.responsible_person || ''
  };
};

// Cache array initialized with mapped default companies
let companiesCache = defaultCompanies.map(mapCompany);
let activeFetchPromise = null;

const dispatchUpdate = () => {
  window.dispatchEvent(new CustomEvent('companiesUpdated'));
};

const companyService = {
  // Synchronous getters from memory cache
  getCompanies: () => {
    return [...companiesCache];
  },

  getCompanyById: (id) => {
    return companiesCache.find(c => c.id === id) || null;
  },

  // API Call: Fetch all companies
  fetchCompanies: async () => {
    if (activeFetchPromise) {
      return activeFetchPromise;
    }

    activeFetchPromise = (async () => {
      try {
        const response = await api.get('/companies/');
        const resData = response.data || response;
        const list = Array.isArray(resData) 
          ? resData 
          : (resData.companies && Array.isArray(resData.companies))
            ? resData.companies
            : (resData.data && Array.isArray(resData.data))
              ? resData.data
              : [];
        
        let mergedList = [...list];
        const defaultIds = ['wysele', 'orbintix', 'gracevirtue'];
        defaultIds.forEach(id => {
          const exists = mergedList.some(c => {
            const cid = (c.company_id || c.id || c._id || '').toLowerCase();
            return cid === id;
          });
          if (!exists) {
            const defComp = defaultCompanies.find(dc => dc.company_id === id);
            mergedList.push(defComp);
          }
        });

        companiesCache = mergedList.map(mapCompany);
        dispatchUpdate();
        return [...companiesCache];
      } catch (err) {
        console.error('Failed to fetch companies from API:', err);
        return [...companiesCache];
      } finally {
        activeFetchPromise = null;
      }
    })();

    return activeFetchPromise;
  },

  // API Call: Create or Update company
  saveCompany: async (companyData) => {
    const compName = companyData.company_name || companyData.name || '';
    const companyId = companyData.company_id || companyData.id || compName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const payload = {
      // Backend expected fields
      company_name: compName,
      company_type: companyData.company_type || 'Pvt Ltd',
      company_email: companyData.company_email || (companyData.email_domain ? (companyData.email_domain.includes('@') ? companyData.email_domain : `info@${companyData.email_domain}`) : `info@${companyData.domain}`),
      description: companyData.description || '',
      website_url: companyData.website_url || companyData.domain_link || '',
      company_representative: companyData.company_representative || companyData.responsible_person || '',
      documents: companyData.documents || null,
      address: companyData.address || '',
      is_active: companyData.is_active !== undefined ? companyData.is_active : true,
      company_id: companyId,
      
      // Frontend expected fields (just in case)
      name: compName,
      domain: companyData.website_url ? companyData.website_url.replace(/https?:\/\/(www\.)?/, '').split('/')[0] : (companyData.domain || ''),
      email_domain: companyData.company_email ? (companyData.company_email.includes('@') ? companyData.company_email.split('@')[1] : companyData.company_email) : (companyData.email_domain || ''),
      domain_link: companyData.website_url || companyData.domain_link || '',
      responsible_person: companyData.company_representative || companyData.responsible_person || ''
    };

    let response;
    // Prefer database primary key (_id) for URL parameters if updating
    const dbId = companyData._id || companyData.id;
    if (dbId) {
      response = await api.put(`/companies/${dbId}`, payload);
    } else {
      // If creating
      response = await api.post('/companies/', payload);
    }

    // Refresh memory cache from backend
    await companyService.fetchCompanies();
    return response.data || response;
  },

  // API Call: Toggle Active Status
  toggleStatus: async (id, isActive) => {
    // Resolve the database primary key (_id) from our local cache
    const cachedCompany = companiesCache.find(c => c.id === id);
    const dbId = cachedCompany?._id || id;

    // 1. Fetch current details
    const responseGet = await api.get(`/companies/${dbId}`);
    const company = responseGet.data || responseGet;

    // 2. Toggle active field
    const payload = {
      ...company,
      is_active: isActive
    };

    // 3. Save via PUT
    const responsePut = await api.put(`/companies/${dbId}`, payload);
    
    // Refresh memory cache
    await companyService.fetchCompanies();
    return responsePut.data || responsePut;
  },

  // API Call: Delete company
  deleteCompany: async (id) => {
    if (id === 'wysele' || id === 'orbintix' || id === 'gracevirtue') {
      throw new Error('Default system companies cannot be deleted.');
    }
    
    // Resolve database primary key (_id) from local cache
    const cachedCompany = companiesCache.find(c => c.id === id);
    const dbId = cachedCompany?._id || id;

    const response = await api.delete(`/companies/${dbId}`);
    
    // Refresh memory cache
    await companyService.fetchCompanies();
    return response.data || response;
  }
};

// Initial background load
companyService.fetchCompanies();

export default companyService;
