document.addEventListener('DOMContentLoaded', function () {
  // Find the clickable div
  const clickableDivs = document.getElementsByClassName('square-container');

  // Add click event listener to the div
  for (let i = 0; i < clickableDivs.length; i++) {
    clickableDivs[i].addEventListener('click', function () {
      const itemId = clickableDivs[i].getAttribute('item-id');
      const subitemAmount = clickableDivs[i].getAttribute('subitem-amount');
      console.log(itemId);
      const name = clickableDivs[i].getAttribute('name');
      const date = clickableDivs[i].getAttribute('date');
      // Create a form element
      const form = document.createElement('form');
      form.setAttribute('method', 'post');
      form.setAttribute(
        'action',
        `gallery-big-view.html?item-number=${itemId}&total-subitems=${subitemAmount}&item-name=${name}&item-date=${date}`
      );

      // Append form to body (or any other parent element)
      document.body.appendChild(form);

      // Submit the form
      form.submit();
    });
  }
});
