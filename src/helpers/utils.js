import '../styles/main.css';

export const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export const capitalize = (string) => {
  const splitStr = string.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' '); 
}

export const renderErrorMessage = (string) => {
  return (
    <div className='user-message'>
      {`Sorry, this maker has no available ${string}`}
    </div>
  );
};
