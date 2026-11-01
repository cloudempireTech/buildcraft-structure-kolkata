// BuildCraft Structure Design — Main Interactive Logic
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Drawer Toggle
  const toggleBtn = document.querySelector('.nav-toggle-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  
  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
      const isOpen = drawer.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      toggleBtn.innerHTML = isOpen 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
      });
    });
  }

  // Portfolio Filter Rail
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;

      projectCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Structural RCC & Steel Feasibility Calculator
  const calcForm = document.getElementById('structural-estimator-form');
  if (calcForm) {
    calcForm.addEventListener('input', calculateStructuralEstimate);
    calcForm.addEventListener('change', calculateStructuralEstimate);
    calculateStructuralEstimate();
  }

  function calculateStructuralEstimate() {
    const areaInput = document.getElementById('calc-area');
    const typeSelect = document.getElementById('calc-type');
    const soilSelect = document.getElementById('calc-soil');
    const resultBox = document.getElementById('calc-result');
    const detailsBox = document.getElementById('calc-details');
    const waInquiryBtn = document.getElementById('calc-wa-btn');

    if (!areaInput || !typeSelect || !soilSelect || !resultBox) return;

    const area = parseFloat(areaInput.value) || 5000;
    const type = typeSelect.value;
    const soil = soilSelect.value;

    let steelMultiplier = 4.2; // kg per sq.ft
    let concreteMultiplier = 0.038; // cubic meter per sq.ft

    if (type === 'highrise') {
      steelMultiplier = 5.5;
      concreteMultiplier = 0.045;
    } else if (type === 'peb') {
      steelMultiplier = 6.2;
      concreteMultiplier = 0.015;
    } else if (type === 'retrofit') {
      steelMultiplier = 2.0;
      concreteMultiplier = 0.012;
    }

    if (soil === 'pile') {
      steelMultiplier *= 1.15;
      concreteMultiplier *= 1.2;
    }

    const steelTonnes = Math.round((area * steelMultiplier) / 1000);
    const concreteCuM = Math.round(area * concreteMultiplier);

    resultBox.innerText = `~${steelTonnes} MT Steel | ~${concreteCuM} m³ RCC`;
    if (detailsBox) {
      detailsBox.innerText = `Based on IS 456 & IS 800 standards for Kolkata seismic Zone III conditions.`;
    }

    if (waInquiryBtn) {
      const typeLabel = typeSelect.options[typeSelect.selectedIndex].text;
      const soilLabel = soilSelect.options[soilSelect.selectedIndex].text;
      const message = encodeURIComponent(
        `Hello BuildCraft Structure Design, I evaluated my project on your website: ${area} sq.ft (${typeLabel}, ${soilLabel}). Estimated demand: ~${steelTonnes} MT Steel and ~${concreteCuM} m³ Concrete. I would like to schedule a structural vetting & blueprint consultation.`
      );
      waInquiryBtn.href = `https://wa.me/917439076081?text=${message}`;
    }
  }

  // Smooth Scroll In Animation Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.bento-card, .project-card, .review-card, .hero-stat-card').forEach(el => {
    observer.observe(el);
  });
});
