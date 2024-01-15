const MONTHS = 'January February March April May June July August September October November December'.split(' ');

// day zero of the next month is the last day of the given month
const daysInMonth = (year, monthIndex) => new Date(year, (monthIndex + 1), 0).getDate();

document.addEventListener('DOMContentLoaded', function() {
  const calendar = document.querySelector('.days');
  const today = new Date();
  const currentDay = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  // populate calendar with 31 days for jan
  [...new Array(daysInMonth(year, month))].forEach((x, i) => {
    let d = document.createElement('div');
    d.setAttribute('data-day', i + 1);
    calendar.appendChild(d);
  });

  // set title of calendar to current month
  let monthString = MONTHS[month];
  document.querySelector('.calendar .month').textContent = `${monthString} ${year}`;

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