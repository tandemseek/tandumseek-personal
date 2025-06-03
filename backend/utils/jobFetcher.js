import axios from 'axios';

export async function fetchJobs(keywords = []) {
  const query = keywords.join(' ');
  const url = 'https://jsearch.p.rapidapi.com/search';

  const options = {
    params: {
      query,
      page: '1',
      num_pages: '1',
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    }
  };

  try {
    const { data } = await axios.get(url, options);
    return (data.data || []).map(job => ({
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city ? `${job.job_city}, ${job.job_state}` : job.job_country,
      description: job.job_description,
      url: job.job_apply_link,
      source: 'JSearch'
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    return [];
  }
}
