import React, { useState, useEffect, useMemo } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import { 
  BarChart as BarChartIcon, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  Activity, 
  Users, 
  Briefcase, 
  MessageSquare, 
  FileText,
  Calendar,
  Download,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Filter,
  FileDown,
  ChevronDown,
  Mail
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, 
  LineChart, Line, 
  AreaChart, Area, 
  PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  RadialBarChart, RadialBar,
  ComposedChart,
  ScatterChart, Scatter,
  ZAxis,
  Funnel, FunnelChart, LabelList
} from 'recharts';

import jobService from '../../services/jobService';
import blogService from '../../services/blogService';
import employeeService from '../../services/employeeService';

// --- Theme Colors ---
const COLORS = {
  primary: '#800000',
  secondary: '#ffcc00',
  crimson: '#C9184A',
  slate: '#1e293b',
  gray: '#94a3b8',
  emerald: '#10b981',
  blue: '#3b82f6',
  amber: '#f59e0b',
  gradients: [
    { id: 'gradPrimary', start: '#800000', end: '#C9184A' },
    { id: 'gradSecondary', start: '#ffcc00', end: '#f59e0b' },
    { id: 'gradBlue', start: '#3b82f6', end: '#60a5fa' }
  ]
};

// --- Helper Components ---

const StatCounter = ({ value, label, trend, icon: Icon, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all"
  >
    <div className="space-y-1">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-black text-gray-900">{value}</h3>
        {trend && (
          <span className={`text-[10px] font-bold flex items-center ${trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {trend > 0 ? <TrendingUp size={10} className="mr-1" /> : <TrendingDown size={10} className="mr-1" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
    <div className={`p-3 rounded-xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
      <Icon size={20} className={color.replace('bg-', 'text-')} />
    </div>
  </motion.div>
);

const ChartCard = ({ title, subtitle, icon: Icon, children, growth }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group"
  >
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#800000]/5 text-[#800000] rounded-lg">
          <Icon size={18} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900 tracking-tight">{title}</h3>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{subtitle}</p>
        </div>
      </div>
      {growth && (
        <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full">
          <TrendingUp size={12} />
          <span className="text-[10px] font-bold">+{growth}%</span>
        </div>
      )}
    </div>
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  </motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/95 backdrop-blur-md border border-white/10 p-3 shadow-2xl rounded-xl text-white">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
            <p className="text-xs font-bold">
              <span className="text-gray-300">{entry.name}:</span> {entry.value}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// --- Mock Data Generators ---
const generateMonthlyData = (base) => [
  { name: 'Jan', value: base + Math.floor(Math.random() * 20) },
  { name: 'Feb', value: base + Math.floor(Math.random() * 25) },
  { name: 'Mar', value: base + Math.floor(Math.random() * 30) },
  { name: 'Apr', value: base + Math.floor(Math.random() * 25) },
  { name: 'May', value: base + Math.floor(Math.random() * 35) },
  { name: 'Jun', value: base + Math.floor(Math.random() * 40) },
];

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [filterRange, setFilterRange] = useState('Monthly');
  const [realData, setRealData] = useState({
    jobs: [],
    apps: [],
    employees: [],
    blogs: [],
    contacts: [],
    consultations: []
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [jobsRes, appsRes, empRes, blogsRes, contRes, consRes] = await Promise.all([
        jobService.getAllJobs(),
        jobService.getAllApplications(),
        employeeService.getAllEmployees(),
        blogService.getAllBlogs(),
        jobService.getAllContacts(),
        jobService.getAllConsultations()
      ]);

      setRealData({
        jobs: jobsRes.jobs || jobsRes.data || (Array.isArray(jobsRes) ? jobsRes : []),
        apps: appsRes.data || (Array.isArray(appsRes) ? appsRes : []),
        employees: empRes.data || (Array.isArray(empRes) ? empRes : []),
        blogs: blogsRes.blogs || blogsRes.data || (Array.isArray(blogsRes) ? blogsRes : []),
        contacts: contRes.contacts || contRes.data || (Array.isArray(contRes) ? contRes : []),
        consultations: consRes.consultations || consRes.data || (Array.isArray(consRes) ? consRes : [])
      });
    } catch (err) {
      console.error('Analytics Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Processed Chart Data ---
  
  const jobsData = useMemo(() => {
    const counts = realData.jobs.reduce((acc, j) => {
      const status = (j.status || 'Active').toLowerCase();
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    
    return [
      { name: 'Active', value: counts.active || 0, color: COLORS.primary },
      { name: 'Closed', value: counts.closed || 0, color: COLORS.amber },
      { name: 'Draft', value: counts.draft || 0, color: COLORS.gray }
    ];
  }, [realData.jobs]);

  const applicantFunnel = [
    { value: 100, name: 'Sourced', fill: '#800000' },
    { value: 80, name: 'Applied', fill: '#A81818' },
    { value: 50, name: 'Shortlisted', fill: '#C9184A' },
    { value: 20, name: 'Interviewed', fill: '#ffcc00' },
    { value: 10, name: 'Hired', fill: '#10b981' },
  ];

  const roleDistribution = [
    { name: 'Admin', value: realData.employees.filter(e => e.role === 'ADMIN').length || 5, fill: '#800000' },
    { name: 'HR', value: realData.employees.filter(e => e.role === 'HR').length || 3, fill: '#ffcc00' },
    { name: 'Manager', value: 4, fill: '#C9184A' },
    { name: 'Engineer', value: 12, fill: '#3b82f6' }
  ];

  return (
    <AdminLayout>
      <div className="space-y-10 pb-16 bg-[#fcfcfc] min-h-screen p-6 admin-scrollbar">
        
        {/* SVG Gradients for Charts */}
        <svg style={{ height: 0, width: 0, position: 'absolute' }}>
          <defs>
            {COLORS.gradients.map(g => (
              <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={g.start} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={g.end} stopOpacity={0}/>
              </linearGradient>
            ))}
          </defs>
        </svg>

        {/* --- Header & Control Panel --- */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-2">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#800000] flex items-center justify-center rounded-xl shadow-lg shadow-maroon-900/20">
                <Activity className="text-white" size={20} />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900">Intelligence Hub</h1>
            </div>
            <p className="text-gray-500 font-medium text-sm">Enterprise-grade monitoring and predictive analytics dashboard.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex p-1 bg-gray-100 rounded-xl">
              {['Weekly', 'Monthly', 'Quarterly', 'Yearly'].map(range => (
                <button
                  key={range}
                  onClick={() => setFilterRange(range)}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                    filterRange === range ? 'bg-white shadow-sm text-[#800000]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button onClick={fetchData} className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-[#800000] hover:shadow-md transition-all">
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#800000] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-maroon-900/10">
              <FileDown size={16} />
              Download PDF
            </button>
          </div>
        </div>

        {/* --- Top Metrics --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCounter label="Active Operations" value={realData.jobs.length + realData.employees.length} trend={12.4} icon={Activity} color="bg-maroon-600" />
          <StatCounter label="Talent Pipeline" value={realData.apps.length} trend={8.1} icon={Users} color="bg-blue-600" />
          <StatCounter label="Revenue Projection" value="$42.5k" trend={15.2} icon={TrendingUp} color="bg-emerald-600" />
          <StatCounter label="Conversion Rate" value="18.6%" trend={-2.4} icon={MessageSquare} color="bg-amber-600" />
        </div>

        {/* --- 1. JOBS ANALYTICS --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <div className="h-6 w-1 bg-[#800000] rounded-full" />
            <h2 className="text-lg font-black uppercase tracking-widest text-gray-900">Jobs Analytics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ChartCard title="Posting Trends" subtitle="Monthly Growth" icon={LineChartIcon} growth="14">
              <AreaChart data={generateMonthlyData(10)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#800000" fill="url(#gradPrimary)" strokeWidth={3} />
              </AreaChart>
            </ChartCard>

            <ChartCard title="Status Mix" subtitle="Inventory Status" icon={PieChartIcon}>
              <PieChart>
                <Pie data={jobsData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {jobsData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }} />
              </PieChart>
            </ChartCard>

            <ChartCard title="Departmental Need" subtitle="Hiring Load" icon={BarChartIcon}>
              <BarChart data={[{n:'IT', v:12}, {n:'Sales', v:8}, {n:'HR', v:5}, {n:'Ops', v:15}]}>
                <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                <Bar dataKey="v" fill="#800000" radius={[4, 4, 0, 0]} />
                <Tooltip content={<CustomTooltip />} />
              </BarChart>
            </ChartCard>

            <ChartCard title="App Velocity" subtitle="Growth per Job" icon={Activity}>
              <LineChart data={generateMonthlyData(40)}>
                <Line type="stepAfter" dataKey="value" stroke="#ffcc00" strokeWidth={3} dot={{ r: 4, fill: '#ffcc00' }} />
                <Tooltip content={<CustomTooltip />} />
              </LineChart>
            </ChartCard>
          </div>
        </section>

        {/* --- 2. APPLICANTS ANALYTICS --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <div className="h-6 w-1 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-black uppercase tracking-widest text-gray-900">Applicants Intelligence</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ChartCard title="Funnel Velocity" subtitle="Hiring Pipeline" icon={TrendingUp}>
              <FunnelChart>
                <Tooltip />
                <Funnel dataKey="value" data={applicantFunnel} isAnimationActive>
                  <LabelList position="right" fill="#888" stroke="none" dataKey="name" fontSize={10} />
                </Funnel>
              </FunnelChart>
            </ChartCard>

            <ChartCard title="Application Mix" subtitle="By Status" icon={PieChartIcon}>
              <PieChart>
                <Pie data={[{n:'Pending', v:45}, {n:'Hired', v:15}, {n:'Reject', v:20}]} innerRadius={0} outerRadius={80} dataKey="v">
                   <Cell fill="#800000" /><Cell fill="#10b981" /><Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ChartCard>

            <ChartCard title="Applicant Growth" subtitle="Cumulative" icon={LineChartIcon}>
              <LineChart data={generateMonthlyData(200)}>
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={4} dot={false} />
                <Tooltip content={<CustomTooltip />} />
              </LineChart>
            </ChartCard>

            <ChartCard title="Dept Load" subtitle="Apps by Dept" icon={BarChartIcon}>
              <BarChart data={[{n:'Tech', a:40, r:20}, {n:'Sales', a:30, r:10}]} layout="vertical">
                <YAxis dataKey="n" type="category" axisLine={false} tick={{ fontSize: 10 }} />
                <XAxis type="number" hide />
                <Bar dataKey="a" stackId="a" fill="#800000" radius={[0, 4, 4, 0]} />
                <Bar dataKey="r" stackId="a" fill="#ffcc00" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartCard>
          </div>
        </section>

        {/* --- 3. EMPLOYEES ANALYTICS --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <div className="h-6 w-1 bg-emerald-600 rounded-full" />
            <h2 className="text-lg font-black uppercase tracking-widest text-gray-900">Human Capital</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <ChartCard title="Role Distribution" subtitle="Headcount by Role" icon={Users}>
                <PieChart>
                  <Pie data={roleDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70}>
                    {roleDistribution.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ChartCard>

             <ChartCard title="Retention" subtitle="Health Index" icon={Activity}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={10} data={[{name:'Retention', value:94, fill:'#10b981'}, {name:'Churn', value:6, fill:'#ef4444'}]}>
                  <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
                  <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: 0, fontSize: 10 }} />
                </RadialBarChart>
             </ChartCard>

             <ChartCard title="Staffing Growth" subtitle="Onboarding Trend" icon={LineChartIcon}>
                <AreaChart data={generateMonthlyData(50)}>
                   <Area dataKey="value" stroke="#10b981" fill="#10b98120" strokeWidth={3} />
                </AreaChart>
             </ChartCard>

             <ChartCard title="Workforce Dept" subtitle="Employee Counts" icon={BarChartIcon}>
                <BarChart data={[{n:'Dev', v:24}, {n:'HR', v:5}, {n:'Mkt', v:8}]}>
                   <Bar dataKey="v" fill="#1e293b" radius={5} />
                </BarChart>
             </ChartCard>
          </div>
        </section>

        {/* --- 4. BLOGS ANALYTICS --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <div className="h-6 w-1 bg-purple-600 rounded-full" />
            <h2 className="text-lg font-black uppercase tracking-widest text-gray-900">Content Performance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <ChartCard title="View Engagement" subtitle="Traffic Trend" icon={TrendingUp}>
                <AreaChart data={generateMonthlyData(1000)}>
                   <Area dataKey="value" stroke="#800000" fill="#80000010" />
                </AreaChart>
             </ChartCard>
             <ChartCard title="Category Mix" subtitle="Topic Shares" icon={PieChartIcon}>
                <PieChart>
                   <Pie data={[{n:'Tech', v:40}, {n:'Career', v:30}]} dataKey="v" outerRadius={60}>
                      <Cell fill="#800000" /><Cell fill="#ffcc00" />
                   </Pie>
                </PieChart>
             </ChartCard>
             <ChartCard title="Pub Frequency" subtitle="Posts/Month" icon={Calendar}>
                <LineChart data={generateMonthlyData(5)}>
                   <Line dataKey="value" stroke="#C9184A" strokeWidth={3} />
                </LineChart>
             </ChartCard>
             <ChartCard title="Top Performers" subtitle="Read Counts" icon={BarChartIcon}>
                <BarChart data={[{n:'B1', v:4500}, {n:'B2', v:3200}]}>
                   <Bar dataKey="v" fill="#800000" />
                </BarChart>
             </ChartCard>
          </div>
        </section>

        {/* --- 5. CONTACTS & CRM --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <div className="h-6 w-1 bg-orange-600 rounded-full" />
            <h2 className="text-lg font-black uppercase tracking-widest text-gray-900">CRM Intelligence</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <ChartCard title="Inquiry Flow" subtitle="Monthly Volume" icon={Mail}>
                <LineChart data={generateMonthlyData(15)}>
                   <Line dataKey="value" stroke="#800000" strokeWidth={3} />
                </LineChart>
             </ChartCard>
             <ChartCard title="Inquiry Source" subtitle="Category Mix" icon={PieChartIcon}>
                <PieChart>
                   <Pie data={[{n:'Support', v:20}, {n:'Sales', v:80}]} dataKey="v" innerRadius={50} outerRadius={70}>
                      <Cell fill="#800000" /><Cell fill="#ffcc00" />
                   </Pie>
                </PieChart>
             </ChartCard>
             <ChartCard title="SLA Response" subtitle="Rate Comparison" icon={Activity}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[{subject:'Response', A:120, full:150}, {subject:'Quality', A:98, full:150}, {subject:'Speed', A:86, full:150}]}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <Radar name="Support" dataKey="A" stroke="#800000" fill="#800000" fillOpacity={0.6} />
                </RadarChart>
             </ChartCard>
             <ChartCard title="Engagement" subtitle="Activity Grid" icon={BarChartIcon}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <XAxis type="number" dataKey="x" name="Hour" unit="h" />
                  <YAxis type="number" dataKey="y" name="Count" />
                  <Scatter name="Activity" data={[{x:10, y:20}, {x:14, y:45}, {x:18, y:30}]} fill="#800000" />
                </ScatterChart>
             </ChartCard>
          </div>
        </section>

        {/* --- 6. CONSULTATIONS --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <div className="h-6 w-1 bg-indigo-600 rounded-full" />
            <h2 className="text-lg font-black uppercase tracking-widest text-gray-900">Expert Consultations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <ChartCard title="Request Density" subtitle="Volume Trend" icon={TrendingUp}>
                <AreaChart data={generateMonthlyData(40)}>
                   <Area dataKey="value" stroke="#800000" fill="#80000020" />
                </AreaChart>
             </ChartCard>
             <ChartCard title="Service Mix" subtitle="Popularity" icon={PieChartIcon}>
                <PieChart>
                   <Pie data={[{n:'SAP', v:60}, {n:'Salesforce', v:40}]} dataKey="v" outerRadius={60}>
                      <Cell fill="#800000" /><Cell fill="#3b82f6" />
                   </Pie>
                </PieChart>
             </ChartCard>
             <ChartCard title="Completion" subtitle="Pipeline Status" icon={Activity}>
                <BarChart data={[{n:'Done', v:85}, {n:'Pending', v:15}]}>
                   <Bar dataKey="v" fill="#10b981" radius={5} />
                </BarChart>
             </ChartCard>
             <ChartCard title="Growth Rate" subtitle="Yearly Delta" icon={LineChartIcon}>
                <LineChart data={generateMonthlyData(20)}>
                   <Line dataKey="value" stroke="#ffcc00" strokeWidth={4} />
                </LineChart>
             </ChartCard>
          </div>
        </section>

      </div>
    </AdminLayout>
  );
}
