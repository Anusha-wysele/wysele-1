const run = async () => {
  try {
    const res = await fetch('https://wysele-backend-three.vercel.app/api/v1/companies/');
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Body:', text);
  } catch (err) {
    console.error(err);
  }
};

run();
