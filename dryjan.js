document.addEventListener('DOMContentLoaded', function() {
  const calendar = document.querySelector('.days');
  const today = new Date();
  const currentDay = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  // populate calendar with 31 days for jan
  [...new Array(31)].forEach((x, i) => {
    let d = document.createElement('div');
    d.setAttribute('data-day', i + 1);
    calendar.appendChild(d);
  });
  Array.from(calendar.children).forEach(dayElement => {
    const day = parseInt(dayElement.getAttribute('data-day'), 10);
    
    // check if the day is today or in the past
    if (day < currentDay) {
      dayElement.classList.add('prev');
    } else if (day === currentDay) {
      dayElement.classList.add('current');
    }
    
    // load thumbsup status from localStorage
    const storageKey = `thumbsup-${year}-${month}-${day}`;
    if (localStorage.getItem(storageKey) === 'true') {
      dayElement.classList.add('thumbsup');
    }
    
    // listen for clicks to toggle previous days' status
    if (day <= currentDay) {
      dayElement.addEventListener('click', function() {
        this.classList.toggle('thumbsup');

        // save values to localstorage
        const isThumbsup = this.classList.contains('thumbsup');
        localStorage.setItem(storageKey, isThumbsup);
      });
    }
  });
});