const CheckPoster = (poster, placeholderURL) => {
  return poster.match(/http/) ? poster : placeholderURL;
};

export default CheckPoster;
