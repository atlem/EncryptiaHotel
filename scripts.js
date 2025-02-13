let roomPrice = 0;
let totalDays = 1;
let slideIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
  showSlides();
  document.getElementById("checkinDate").value = new Date().toISOString().split("T")[0];
});

function plusSlides(n) {
  slideIndex += n;
  showSlides();
}

function showSlides() {
  let slides = document.getElementsByClassName("slides");
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;
  for (let slide of slides) slide.style.display = "none";
  slides[slideIndex].style.display = "block";
}

function redirectToRegister(roomName, price) {
  document.getElementById('roomSelected').value = roomName;
  roomPrice = price;
  document.getElementById('checkinDate').value = "";  
  document.getElementById('checkoutDate').value = "";
  updatePrice();
  openTab(null, 'register');
}

function calculateDays() {
  let checkin = new Date(document.getElementById('checkinDate').value);
  let checkout = new Date(document.getElementById('checkoutDate').value);
  totalDays = checkout > checkin ? Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24)) : 1;
  updatePrice();
}

document.getElementById('checkinDate').addEventListener('change', calculateDays);
document.getElementById('checkoutDate').addEventListener('change', calculateDays);
document.getElementById('breakfast').addEventListener('change', updatePrice);
document.getElementById('dinner').addEventListener('change', updatePrice);

function updatePrice() {
  if (!roomPrice) {
    document.getElementById('totalPrice').innerText = "$0";
    return;
  }
  let breakfast = document.getElementById('breakfast').checked ? 10 * totalDays : 0;
  let dinner = document.getElementById('dinner').checked ? 20 * totalDays : 0;
  document.getElementById('totalPrice').innerText = `$${(roomPrice * totalDays) + breakfast + dinner}`;
}

function openTab(event, tabName) {
  let tabs = document.getElementsByClassName("tab-content");
  for (let tab of tabs) tab.style.display = "none";
  document.getElementById(tabName).style.display = "block";
  let buttons = document.getElementsByClassName("tab-button");
  for (let btn of buttons) btn.classList.remove("active");
  if (event) event.currentTarget.classList.add("active");
}
