// Smooth scroll to Jobs section
function scrollToJobs() {
  document.getElementById("jobs").scrollIntoView({ behavior:"smooth" });
}

// Toggle mobile menu
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
toggle.addEventListener('click', ()=>{ menu.classList.toggle('active'); });

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', ()=>{
  backToTop.style.display = window.scrollY>300?'block':'none';
});
backToTop.addEventListener('click', ()=>{ window.scrollTo({ top:0, behavior:"smooth" }); });

// Navbar active section highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav .menu a");
window.addEventListener("scroll", ()=>{
  let current="";
  sections.forEach(section=>{
    if(window.scrollY>=section.offsetTop-80) current=section.getAttribute("id");
  });
  navLinks.forEach(link=>{
    link.classList.remove("active");
    if(link.getAttribute("href")==="#"+current) link.classList.add("active");
  });
});

// ---------- JOB DATA ----------
const jobs=[
  {title:"Library Assistant", type:"On-Campus", location:"Campus A", remote:"No", img:"https://img.icons8.com/ios-filled/50/000000/books.png"},
  {title:"IT Support Intern", type:"Internship", location:"Campus B", remote:"Yes", img:"https://img.icons8.com/ios-filled/50/000000/laptop.png"},
  {title:"Cafeteria Staff", type:"Work-Study", location:"Campus C", remote:"No", img:"https://img.icons8.com/ios-filled/50/000000/restaurant.png"},
  {title:"Marketing Intern", type:"Off-Campus", location:"Campus A", remote:"Yes", img:"https://img.icons8.com/ios/50/000000/megaphone.png"},
  {title:"Research Assistant", type:"On-Campus", location:"Campus B", remote:"No", img:"https://img.icons8.com/ios/50/000000/microscope.png"},
  {title:"Front Desk Assistant", type:"Work-Study", location:"Campus C", remote:"No", img:"https://img.icons8.com/ios-filled/50/000000/office.png"},
  {title:"Virtual Assistant", type:"Remote", location:"Online", remote:"Yes", img:"https://img.icons8.com/ios-filled/50/000000/headset.png"},
{title:"Mystery Shopper", type:"Off-Campus", location:"Various Locations", remote:"No", img:"https://cdn-icons-png.flaticon.com/512/1041/1041916.png"},
];


// Render job cards
const jobContainer=document.getElementById("jobCards");
function renderJobs(list){
  jobContainer.innerHTML="";
  list.forEach(job=>{
    const div=document.createElement("div");
    div.classList.add("card");
    div.innerHTML=`
      <div class="job-img"><img src="${job.img}" alt="${job.title}" /></div>
      <h3>${job.title}</h3>
      <p><strong>Type:</strong> ${job.type}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Remote:</strong> ${job.remote}</p>
    `;
    jobContainer.appendChild(div);
  });
}

// Filter & Search
const searchInput=document.getElementById("searchInput");
const jobTypeFilter=document.getElementById("jobTypeFilter");
const locationFilter=document.getElementById("locationFilter");

function filterJobs(){
  const searchValue=searchInput.value.toLowerCase();
  const typeValue=jobTypeFilter.value;
  const locationValue=locationFilter.value;
  const filtered=jobs.filter(job=>{
    return job.title.toLowerCase().includes(searchValue) &&
           (typeValue==="all" || job.type===typeValue) &&
           (locationValue==="all" || job.location===locationValue);
  });
  renderJobs(filtered);
}

searchInput.addEventListener("input", filterJobs);
jobTypeFilter.addEventListener("change", filterJobs);
locationFilter.addEventListener("change", filterJobs);

// Initial render
renderJobs(jobs);
const counters = document.querySelectorAll('.counter');

function animateCounters() {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / 200; // adjust speed

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}

// Trigger animation when section is in view
const impactSection = document.getElementById('impact');
let hasAnimated = false;

window.addEventListener('scroll', () => {
  const sectionPos = impactSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.2;

  if (sectionPos < screenPos && !hasAnimated) {
    animateCounters();
    hasAnimated = true;
  }
});

document.getElementById("googleFormBtn").addEventListener("click", () => {
  window.open("https://forms.gle/KdGwrSrC5jKYYHy89", "_blank");
});