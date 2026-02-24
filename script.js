

document.addEventListener('DOMContentLoaded', () => {

  const totalCountEl = document.getElementById('totalCount');
  const interviewCountEl = document.getElementById('interviewCount');
  const rejectedCountEl = document.getElementById('rejectedCount');
  const allJobsCountEl = document.getElementById('allJobsCount');

  const cardsContainer = document.getElementById('cardsContainer');

  const allTab = document.getElementById('allTab');
  const interviewTab = document.getElementById('interviewTab');
  const rejectTab = document.getElementById('rejectTab');


  allTab.setAttribute('data-tab', 'all');
  interviewTab.setAttribute('data-tab', 'interview');
  rejectTab.setAttribute('data-tab', 'rejected');

  let currentTab = 'all';


  function updateCounters() {
    const allCards = document.querySelectorAll('.job-card');

    const interviewCards = document.querySelectorAll('.job-card[data-status="interview"]');
    const rejectedCards = document.querySelectorAll('.job-card[data-status="rejected"]');

    totalCountEl.textContent = allCards.length;
    interviewCountEl.textContent = interviewCards.length;
    rejectedCountEl.textContent = rejectedCards.length;


    allJobsCountEl.textContent = `${allCards.length} Jobs`;
  }


  function filterCards() {
    const cards = document.querySelectorAll('.job-card');

    cards.forEach(card => {
      const status = card.getAttribute('data-status') || 'applied';

      if (currentTab === 'all') {
        card.style.display = 'block';
      } else if (currentTab === 'interview') {
        card.style.display = status === 'interview' ? 'block' : 'none';
      } else if (currentTab === 'rejected') {
        card.style.display = status === 'rejected' ? 'block' : 'none';
      }
    });


    const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');

    let noJobsMsg = document.getElementById('no-jobs-message');

    if (visibleCards.length === 0) {
      if (!noJobsMsg) {
        noJobsMsg = document.createElement('div');
        noJobsMsg.id = 'no-jobs-message';

        noJobsMsg.className = 'text-center text-gray-500 text-xl py-10 col-span-3';

        const imgUrl = '../image/jobs.png'

        noJobsMsg.innerHTML = `
            <img src="${imgUrl}" 
                 alt="No jobs found" 
                 class="mx-auto mb-6 w-40 h-40 object-contain opacity-80">
            <p class="text-xl text-gray-600 font-medium">No jobs found</p>
            <p class="text-gray-400 mt-2">No applications match this filter yet</p>
        `;
        cardsContainer.appendChild(noJobsMsg);
      }

      noJobsMsg.style.display = 'block';
    } else {
      if (noJobsMsg) noJobsMsg.style.display = 'none';
    }
  }


  function handleTabClick(tabEl, tabName) {

    [allTab, interviewTab, rejectTab].forEach(btn => {
      btn.classList.remove('bg-blue-600', 'text-white');
      btn.classList.add('bg-gray-200');
    });

    tabEl.classList.remove('bg-gray-200');
    tabEl.classList.add('bg-blue-500', 'text-white');

    currentTab = tabName;
    filterCards();
  }

  allTab.addEventListener('click', () => handleTabClick(allTab, 'all'));
  interviewTab.addEventListener('click', () => handleTabClick(interviewTab, 'interview'));
  rejectTab.addEventListener('click', () => handleTabClick(rejectTab, 'rejected'));


  cardsContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.job-card');
    if (!card) return;

    const status = card.getAttribute('data-status') || 'applied';

    // Interview button
    if (e.target.classList.contains('interview-btn')) {
      if (status !== 'interview') {
        card.setAttribute('data-status', 'interview');

        card.classList.remove('bg-gray-200');
        card.classList.add('bg-green-50', 'border', 'border-green-300');

        const applyBtn = card.querySelector('button.bg-white');
        if (applyBtn) applyBtn.textContent = 'Applied';

        updateCounters();
        filterCards();
      }
    }

    // Rejected button
    else if (e.target.classList.contains('rejected-btn')) {
      if (status !== 'rejected') {
        card.setAttribute('data-status', 'rejected');

        card.classList.remove('bg-gray-200', 'bg-green-50');
        card.classList.add('bg-red-50', 'border', 'border-red-300');

        const applyBtn = card.querySelector('button.bg-white');
        if (applyBtn) applyBtn.textContent = 'Rejected';

        updateCounters();
        filterCards();
      }
    }

    // Delete button
    else if (e.target.closest('.delete-btn')) {
      if ('Delete') {
        card.remove();
        updateCounters();
        filterCards();
      }
    }
  });


  updateCounters();
  filterCards();
  handleTabClick(allTab, 'all');
});