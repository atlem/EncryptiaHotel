let roomPrice = 0;
let totalDays = 1;

function redirectToRegister(roomName, price) {
  document.getElementById('roomSelected').value = roomName;
  roomPrice = price;
  document.getElementById('checkinDate').value = "";  
  document.getElementById('checkoutDate').value = "";
  updatePrice();
  $('.nav-tabs a[href="#register"]').tab('show');
}

function calculateDays() {
  let checkin = new Date(document.getElementById('checkinDate').value);
  let checkout = new Date(document.getElementById('checkoutDate').value);

  if (checkout > checkin) {
    totalDays = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
  } else {
    totalDays = 1;
  }

  updatePrice();
}

function updatePrice() {
  if (!roomPrice) {
    document.getElementById('totalPrice').innerText = "$0";
    return;
  }

  let breakfast = document.getElementById('breakfast').checked ? 10 * totalDays : 0;
  let dinner = document.getElementById('dinner').checked ? 20 * totalDays : 0;

  let total = (roomPrice * totalDays) + breakfast + dinner;
  document.getElementById('totalPrice').innerText = `$${total}`;
}

document.getElementById('checkinDate').addEventListener('change', calculateDays);
document.getElementById('checkoutDate').addEventListener('change', calculateDays);
document.getElementById('breakfast').addEventListener('change', updatePrice);
document.getElementById('dinner').addEventListener('change', updatePrice);

$(document).ready(function() {
  $('#hotelCarousel').carousel();
});

document.addEventListener("DOMContentLoaded", function () {
  // Set default check-in date to today's date
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("checkinDate").value = today;
});
