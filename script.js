// Carousel Logic
const images = document.querySelectorAll(".carousel-images img");
let current = 0;
setInterval(() => {
  images.forEach((img, i) => {
    img.style.opacity = i === current ? "1" : "0";
  });
  current = (current + 1) % images.length;
}, 4000);

// === Car Data Arrays ===
const featuredCars = [
  {
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2020,
    price: 2850000,
    km: 45000,
    fuel: "Diesel",
    images: ["images/Merc/I1.png", "images/Merc/I2.png", "images/Merc/I3.png", "images/Merc/I4.png"],
    owner: { name: "Rahul Sharma", email: "rahul.sharma.cars@email.com", phone: "+91-9876543210" }
  },
  {
    make: "BMW",
    model: "X3 xDrive30i",
    year: 2019,
    price: 3200000,
    km: 52000,
    fuel: "Petrol",
    images: ["images/BMW/I4.png", "images/BMW/I1.png", "images/BMW/I2.png", "images/BMW/I3.png"],
    owner: { name: "John Doe", email: "john@example.com", phone: "+91-9999999999" }
  },
  {
    make: "Audi",
    model: "A4",
    year: 2021,
    price: 2975000,
    km: 30000,
    fuel: "Petrol",
    images: ["images/Audi/I1.png", "images/Audi/I2.png", "images/Audi/I3.png", "images/Audi/I4.png"],
    owner: { name: "Jane Doe", email: "jane@example.com", phone: "+91-8888888888" }
  },
  {
    make: "Volvo",
    model: "XC60",
    year: 2018,
    price: 2650000,
    km: 60000,
    fuel: "Diesal",
    images: ["images/Volvo/I1.png", "images/Volvo/I2.png", "images/Volvo/I3.png", "images/Volvo/I4.png"],
    owner: { name: "Rahul Sharma", email: "rahul@example.com", phone: "+91-7777777777" }
  },
  {
    make: "Skoda",
    model: "Superb",
    year: 2020,
    price: 2200000,
    km: 38000,
    fuel: "Petrol",
    images: ["images/Skoda/I1.png", "images/Skoda/I2.png", "images/Skoda/I3.png", "images/Skoda/I4.png"],
    owner: { name: "Neha Verma", email: "neha@example.com", phone: "+91-6666666666" }
  },
  {
    make: "Toyota",
    model: "Fortuner",
    year: 2017,
    price: 2700000,
    km: 60000,
    fuel: "Petrol",
    images: ["images/Toyota/F/I1.png", "images/Toyota/F/I2.png", "images/Toyota/F/I3.png", "images/Toyota/F/I4.png"],
    owner: { name: "Ravi Kumar", email: "ravi@example.com", phone: "+91-5555555555" }
  },
  {
    make: "Honda",
    model: "CR-V",
    year: 2017,
    price: 2000000,
    km: 45000,
    fuel: "Diesal",
    images: ["images/honda/I1.png", "images/honda/I2.png", "images/honda/I3.png", "images/honda/I4.png"],
    owner: { name: "Sneha Patel", email: "sneha@example.com", phone: "+91-4444444444" }
  },
  {
    make: "Toyota",
    model: "Camry",
    year: 2020,
    price: 3500000,
    km: 60000,
    fuel: "Petrol",
    images: ["images/Toyota/C/I1.png", "images/Toyota/C/I2.png", "images/Toyota/C/I3.png", "images/Toyota/C/I4.png"],
    owner: { name: "Karthik Reddy", email: "karthik@example.com", phone: "+91-3333333333" }
  }
];

function renderFeaturedCars() {
  const container = document.getElementById("featured-cars");
  container.innerHTML = "";

  featuredCars.forEach((car, index) => {
    const card = document.createElement("div");
    card.className = "car-card";
    card.innerHTML = `
      <img src="${car.images[0]}" alt="${car.model}" />
      <h3>${car.year} ${car.make} ${car.model}</h3>
      <p>Price: ₹${car.price.toLocaleString()}</p>
      <p>Kilometers: ${car.km.toLocaleString()} km</p>
      <button 
        class="view-details-btn" 
        data-index="${index}" 
        data-source="featured"
      >View Details</button>
    `;
    container.appendChild(card);
  });

  // Attach View Details button logic for featured cars
  document.querySelectorAll(".view-details-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const index = btn.getAttribute("data-index");
    openCarDetailsPopup(featuredCars[index]);
  });
});
}

// === View Details Logic ===
const viewDetailsButtons = document.querySelectorAll(".view-details-btn");
const carDetailsModal = document.getElementById("car-details-modal");
const closeDetailsBtn = document.querySelector(".close-details");

viewDetailsButtons.forEach(button => {
  button.addEventListener("click", () => {
    const index = button.getAttribute("data-index");
    const source = button.getAttribute("data-source");

    const car = featuredCars[index]; // only for featured section for now

    // Populate images
    const carImagesContainer = carDetailsModal.querySelector(".car-images");
    carImagesContainer.innerHTML = "";
    car.images.forEach(img => {
      const imageTag = document.createElement("img");
      imageTag.src = img;
      imageTag.alt = car.model;
      carImagesContainer.appendChild(imageTag);
    });

    // Populate car details
    carDetailsModal.querySelector(".car-info").innerHTML = `
      <h3>${car.year} ${car.make} ${car.model}</h3>
      <p><strong>Price:</strong> ₹${car.price.toLocaleString()}</p>
      <p><strong>Year:</strong> ${car.year}</p>
      <p><strong>KM Driven:</strong> ${car.km.toLocaleString()} km</p>
      <p><strong>Fuel Type:</strong> ${car.fuel}</p>
    `;

    // Populate owner details
    carDetailsModal.querySelector(".owner-info").innerHTML = `
      <h3>Owner Details</h3>
      <p><strong>Name:</strong> ${car.owner.name}</p>
      <p><strong>Email:</strong> ${car.owner.email}</p>
      <p><strong>Phone:</strong> ${car.owner.phone}</p>
    `;

    // Show modal
    carDetailsModal.style.display = "block";
  });
});

closeDetailsBtn.addEventListener("click", () => {
  carDetailsModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === carDetailsModal) {
    carDetailsModal.style.display = "none";
  }
});

// ===============================
// Login / Signup Modal Logic
// ===============================
const authBtn = document.querySelector(".auth-btn");
const modal = document.getElementById("auth-modal");
const closeBtn = document.querySelector(".close");
const loginForm = document.getElementById("auth-form");
const signupForm = document.getElementById("signup-form");

const signupToggle = document.getElementById("signup-toggle");
const loginToggle = document.getElementById("login-toggle");

const loginFeedback = document.createElement("p");
const signupFeedback = document.createElement("p");

loginFeedback.className = "form-feedback";
signupFeedback.className = "form-feedback";

loginForm.appendChild(loginFeedback);
signupForm.appendChild(signupFeedback);

// ===============================
// Show/Hide Modal
// ===============================
authBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  loginFeedback.textContent = "";
  signupFeedback.textContent = "";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    loginFeedback.textContent = "";
    signupFeedback.textContent = "";
  }
});

// ===============================
// Toggle Login / Signup Form
// ===============================
signupToggle.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  signupForm.style.display = "block";
  loginFeedback.textContent = "";
  signupFeedback.textContent = "";
});

loginToggle.addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.style.display = "none";
  loginForm.style.display = "block";
  loginFeedback.textContent = "";
  signupFeedback.textContent = "";
});

// ===============================
// Toggle Password Visibility
// ===============================
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  input.type = input.type === "password" ? "text" : "password";
}

// ===============================
// Password Validation Regex
// ===============================
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

// ===============================
// Login Form Submission
// ===============================
loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const usernameOrEmail = loginForm.querySelector('input[placeholder="Username or Email"]').value;
  const password = loginForm.querySelector('input[placeholder="Password"]').value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernameOrEmail, password })
    });

    const data = await res.json();

    if (res.ok) {
      // Hide the form and show success message
      loginForm.style.display = "none";

      const successDiv = document.createElement("div");
      successDiv.className = "success-message";
      successDiv.innerHTML = `
        <h2>✅ Login Successful!</h2>
        <p>Welcome back!</p>
      `;

      modal.querySelector(".modal-content").appendChild(successDiv);

      // Redirect to profile icon after 2s
      setTimeout(() => {
        successDiv.remove();
        modal.style.display = "none";
        loginForm.reset();
        loginForm.style.display = "block";

        // Replace login/signup button with profile icon
        const authBtn = document.querySelector(".auth-btn");
        authBtn.innerHTML = `<img src="images/P.png" alt="Profile" class="profile-icon-img">`;
        authBtn.classList.add("profile-icon");
        authBtn.removeEventListener("click", openAuthModal); // prevent modal from reopening
      }, 2000);
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    alert("An error occurred during login");
  }
});

// ===============================
// Signup Form Submission
// ===============================
signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const fullName = signupForm.querySelector('input[placeholder="Full Name"]').value;
  const phone = signupForm.querySelector('input[placeholder="Phone Number"]').value;
  const username = signupForm.querySelector('input[placeholder="Username"]').value;
  const email = signupForm.querySelector('input[placeholder="Email"]').value;
  const password = signupForm.querySelector('input[placeholder="Password"]').value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, phone, username, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      // Show success animation
      loginForm.innerHTML = `<div class="success-message">✅ Login Successful!</div>`;
      
      // Save user in localStorage
      localStorage.setItem("autodealUser", JSON.stringify(data.user));

      // After a short delay
      setTimeout(() => {
        modal.style.display = "none";

        // Change auth button to profile icon
        const authToggle = document.getElementById("auth-toggle");
        authToggle.innerHTML = `<img src="images/profile-icon.png" alt="Profile" style="width: 30px; height: 30px;" />`;
        authToggle.id = "profile-btn"; // So it works with profile modal
      }, 1500);
    } else {
      alert(data.message || "Signup failed");
    }
  } catch (err) {
    alert("An error occurred during signup");
  }
});


// ==== Sell Your Car Modal ====
const sellBtn = document.querySelector(".btn.green");
const sellModal = document.getElementById("sell-modal");
const sellClose = document.querySelector(".sell-close");

sellBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sellModal.style.display = "block";
});

sellClose.addEventListener("click", () => {
  sellModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === sellModal) {
    sellModal.style.display = "none";
  }
});

// ==== Browse Inventory Modal ====
const inventoryBtn = document.querySelector(".btn.blue");
const inventoryModal = document.getElementById("browse-inventory-modal");
const inventoryClose = document.querySelector(".close-inventory");

inventoryBtn.addEventListener("click", (e) => {
  e.preventDefault();
  inventoryModal.style.display = "block";
  renderCars(); // show all cars initially
});

inventoryClose.addEventListener("click", () => {
  inventoryModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === inventoryModal) {
    inventoryModal.style.display = "none";
  }
});

// ==== Sample Car Data ====
const allCars = [
  {
    make: "Maruti",
    model: "Swift",
    price: 450000,
    year: 2018,
    km: 45000,
    fuel: "Petrol",
    img: ["images/MS 2018.jpg", "images/MS 2018.jpg", "images/MS 2018.jpg", "images/MS 2018.jpg"],
    owner: {
      name: "Owner 1",
      email: "owner1@example.com",
      phone: "+91-999999001"
    }
  },
  {
    make: "Hyundai",
    model: "i20",
    price: 520000,
    year: 2016,
    km: 60000,
    fuel: "Petrol",
    img: ["images/H i20.png", "images/H i20.png", "images/H i20.png", "images/H i20.png"],
    owner: {
      name: "Owner 2",
      email: "owner2@example.com",
      phone: "+91-999999002"
    }
  },
  {
    make: "Maruti",
    model: "Swift Dzire",
    price: 550000,
    year: 2018,
    km: 5000,
    fuel: "Petrol",
    img: ["images/MS.png", "images/MS.png", "images/MS.png", "images/MS.png"],
    owner: {
      name: "Owner 3",
      email: "owner3@example.com",
      phone: "+91-999999003"
    }
  },
  {
    make: "Hyundai",
    model: "i10",
    price: 320000,
    year: 2016,
    km: 70000,
    fuel: "Petrol",
    img: ["images/H i10.png", "images/H i10.png", "images/H i10.png", "images/H i10.png"],
    owner: {
      name: "Owner 4",
      email: "owner4@example.com",
      phone: "+91-999999004"
    }
  },
  {
    make: "Maruti",
    model: "Swift",
    price: 350000,
    year: 2012,
    km: 65000,
    fuel: "Petrol",
    img: ["images/MS D.png", "images/MS D.png", "images/MS D.png", "images/MS D.png"],
    owner: {
      name: "Owner 5",
      email: "owner5@example.com",
      phone: "+91-999999005"
    }
  },
  {
    make: "Hyundai",
    model: "Verna",
    price: 620000,
    year: 2019,
    km: 60000,
    fuel: "Petrol",
    img: ["images/H V.png", "images/H V.png", "images/H V.png", "images/H V.png"],
    owner: {
      name: "Owner 6",
      email: "owner6@example.com",
      phone: "+91-999999006"
    }
  },
  {
    make: "Honda",
    model: "Amaze",
    price: 450000,
    year: 2017,
    km: 45000,
    fuel: "Petrol",
    img: ["images/H A.png", "images/H A.png", "images/H A.png", "images/H A.png"],
    owner: {
      name: "Owner 7",
      email: "owner7@example.com",
      phone: "+91-999999007"
    }
  },
  {
    make: "Tata",
    model: "Tiago",
    price: 500000,
    year: 2016,
    km: 60000,
    fuel: "Petrol",
    img: ["images/TT.png", "images/TT.png", "images/TT.png", "images/TT.png"],
    owner: {
      name: "Owner 8",
      email: "owner8@example.com",
      phone: "+91-999999008"
    }
  },
  {
    make: "Mercedes-Benz",
    model: "C-Class",
    price: 450000,
    year: 2020,
    km: 45000,
    fuel: "Diesel",
    img: ["images/Merc/I4.png", "images/Merc/I2.png", "images/Merc/I3.png", "images/Merc/I1.png"],
    owner: { name: "Rahul Sharma", email: "rahul.sharma.cars@email.com", phone: "+91-9876543210" }
  },
  {
    make: "BMW",
    model: "X3 xDrive30i",
    price: 3200000,
    year: 2019,
    km: 52000,
    fuel: "Petrol",
    img: ["images/BMW/I4.png", "images/BMW/I1.png", "images/BMW/I2.png", "images/BMW/I3.png"],
    owner: { name: "John Doe", email: "john@example.com", phone: "+91-9999999999" }
  },
  {
    make: "Audi",
    model: "A4",
    price: 2975000,
    year: 2021,
    km: 30000,
    fuel: "Petrol",
    img: ["images/Audi/I2.png", "images/Audi/I1.png", "images/Audi/I3.png", "images/Audi/I4.png"],
    owner: { name: "Jane Doe", email: "jane@example.com", phone: "+91-8888888888" }
  },
  {
    make: "Volvo",
    model: "XC60",
    price: 2650000,
    year: 2018,
    km: 60000,
    fuel: "Diesal",
    img: ["images/Volvo/I2.png", "images/Volvo/I1.png", "images/Volvo/I3.png", "images/Volvo/I4.png"],
    owner: { name: "Rahul Sharma", email: "rahul@example.com", phone: "+91-7777777777" }
  },
  {
    make: "Skoda",
    model: "Superb",
    price: 2200000,
    year: 2020,
    km: 38000,
    fuel: "Petrol",
    img: ["images/Skoda/I1.png", "images/Skoda/I2.png", "images/Skoda/I3.png", "images/Skoda/I4.png"],
    owner: { name: "Neha Verma", email: "neha@example.com", phone: "+91-6666666666" }
  },
  {
    make: "Toyota",
    model: "Fortuner",
    price: 2700000,
    year: 2017,
    km: 60000,
    fuel: "Petrol",
    img: ["images/Toyota/F/I2.png", "images/Toyota/F/I1.png", "images/Toyota/F/I3.png", "images/Toyota/F/I4.png"],
    owner: { name: "Ravi Kumar", email: "ravi@example.com", phone: "+91-5555555555" }
  },
  {
    make: "Honda",
    model: "CR-V",
    price: 2000000,
    year: 2017,
    km: 45000,
    fuel: "Diesal",
    img: ["images/honda/I1.png", "images/honda/I2.png", "images/honda/I3.png", "images/honda/I4.png"],
    owner: { name: "Sneha Patel", email: "sneha@example.com", phone: "+91-4444444444" }
  },
  {
    make: "Toyota",
    model: "Camry",
    price: 3500000,
    year: 2020,
    km: 60000,
    fuel: "Petrol",
    img: ["images/Toyota/C/I2.png", "images/Toyota/C/I1.png", "images/Toyota/C/I3.png", "images/Toyota/C/I4.png"],
    owner: { name: "Karthik Reddy", email: "karthik@example.com", phone: "+91-3333333333" }
  }
];

function renderCars(filtered = allCars) {
  const container = document.getElementById("filtered-cars");
  const count = document.getElementById("car-count");
  container.innerHTML = "";
  count.textContent = filtered.length;

  if (filtered.length === 0) {
    container.innerHTML = "<p>No cars match your criteria.</p>";
    return;
  }

  filtered.forEach((car, index) => {
    const card = document.createElement("div");
    card.className = "car-card";
    card.innerHTML = `
      <img src="${car.img[0]}" alt="${car.model}" />
      <h3>${car.year} ${car.make} ${car.model}</h3>
      <p>Price: ₹${car.price.toLocaleString()}</p>
      <p>Kilometers: ${car.km.toLocaleString()} km</p>
      <button 
        class="view-details-btn"
        data-index="${index}"
        data-source="inventory"
      >View Details</button>
    `;
    container.appendChild(card);
  });

  // ✅ Attach correct listener for View Details
  document.querySelectorAll(".scroll-area .view-details-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      openCarDetailsPopup(filtered[index]); // Use filtered not allCars
    });
  });
}


// ==== Filtering Logic ====
document.getElementById("filter-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const make = document.getElementById("car-make").value.toLowerCase();
  const model = document.getElementById("car-model").value.toLowerCase();
  const minPrice = parseInt(document.getElementById("price-min").value) || 0;
  const maxPrice = parseInt(document.getElementById("price-max").value) || Infinity;
  const minYear = parseInt(document.getElementById("year-min").value) || 0;
  const maxYear = parseInt(document.getElementById("year-max").value) || Infinity;
  const maxKm = parseInt(document.getElementById("km-max").value) || Infinity;
  const fuel = document.getElementById("fuel-type").value.toLowerCase();

  const filtered = allCars.filter(car => {
    return (
      (make === "" || car.make.toLowerCase().includes(make)) &&
      (model === "" || car.model.toLowerCase().includes(model)) &&
      car.price >= minPrice &&
      car.price <= maxPrice &&
      car.year >= minYear &&
      car.year <= maxYear &&
      car.km <= maxKm &&
      (fuel === "" || car.fuel.toLowerCase() === fuel)
    );
  });

  renderCars(filtered);
});

// ==== Clear Filters ====
document.getElementById("clear-filters").addEventListener("click", () => {
  document.getElementById("filter-form").reset();
  renderCars();
});

// ==== Car Details Modal Logic ====
function openCarDetailsPopup(car) {
  const modal = document.getElementById("car-details-modal");
  const imagesContainer = modal.querySelector(".car-images");
  const carInfo = modal.querySelector(".car-info");
  const ownerInfo = modal.querySelector(".owner-info");

  // Populate images
  imagesContainer.innerHTML = "";
  car.img.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    imagesContainer.appendChild(img);
  });

  // Car info
  carInfo.innerHTML = `
    <h3>${car.year} ${car.make} ${car.model}</h3>
    <p><strong>Price:</strong> ₹${car.price.toLocaleString()}</p>
    <p><strong>Year:</strong> ${car.year}</p>
    <p><strong>Kilometers Driven:</strong> ${car.km.toLocaleString()} km</p>
    <p><strong>Fuel Type:</strong> ${car.fuel}</p>
  `;

  // Owner info
  ownerInfo.innerHTML = `
    <h3>Owner Details</h3>
    <p><strong>Name:</strong> ${car.owner.name}</p>
    <p><strong>Email:</strong> ${car.owner.email}</p>
    <p><strong>Phone:</strong> ${car.owner.phone}</p>
  `;

  modal.style.display = "block";
}

// ==== Close View Details Modal ====
const detailsModal = document.getElementById("car-details-modal");
const detailsClose = document.querySelector(".close-details");

document.querySelector(".close-details").addEventListener("click", () => {
  document.getElementById("car-details-modal").style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target.id === "car-details-modal") {
    document.getElementById("car-details-modal").style.display = "none";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  renderFeaturedCars();
});

// Show Profile Modal
const profileBtn = document.getElementById("profile-btn");
const profileModal = document.getElementById("profile-modal");
const profileClose = document.querySelector(".profile-close");

if (profileBtn) {
  profileBtn.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("autodealUser"));
    if (user) {
      document.getElementById("profile-username").textContent = user.username;
      document.getElementById("profile-email").textContent = user.email;
      profileModal.style.display = "block";
    }
  });
}

if (profileClose) {
  profileClose.addEventListener("click", () => {
    profileModal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === profileModal) {
    profileModal.style.display = "none";
  }
});

const logoutBtn = document.querySelector(".logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("autodealUser");
    location.reload();
  });
}

// Show profile icon if logged in
window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("autodealUser"));
  const authToggle = document.getElementById("auth-toggle");

  if (user && authToggle) {
    authToggle.innerHTML = `<img src="images/profile-icon.png" alt="Profile Icon" class="profile-icon" />`;
    authToggle.id = "profile-btn"; // Convert button to profile
    attachProfileLogic(); // Attach profile logic
  }
});

function attachProfileLogic() {
  const profileBtn = document.getElementById("profile-btn");
  const profileModal = document.getElementById("profile-modal");
  const profileClose = document.querySelector(".profile-close");

  profileBtn?.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("autodealUser"));
    if (user) {
      document.getElementById("profile-username").textContent = user.username;
      document.getElementById("profile-email").textContent = user.email;
      profileModal.style.display = "block";
    }
  });

  profileClose?.addEventListener("click", () => {
    profileModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === profileModal) {
      profileModal.style.display = "none";
    }
  });

  document.querySelector(".logout")?.addEventListener("click", () => {
    localStorage.removeItem("autodealUser");
    location.reload();
  });
}