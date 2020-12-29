let apiURL = process.env.REACT_APP_API || 'https://api.lesbar.club';

if (process.env.NODE_ENV === 'development') {
  apiURL = 'http://localhost:8000';
}

export default {
  apiURL,
};
