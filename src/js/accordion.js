/**
 * Flex-box: два независимых набора аккордеонов.
 * — Финансы: первые #secondAccordion / #lastAccordion в документе — простое поведение.
 * — Доступные лоты (#Sales): #lastAccordion (вторая копия id), #balashikhaAccordion, #sokolovoAccordion.
 */
document.addEventListener('DOMContentLoaded', () => {
  const dupSecond = document.querySelectorAll('[id="secondAccordion"]');
  const dupLast = document.querySelectorAll('[id="lastAccordion"]');
  const balashikhaAccordion = document.getElementById('balashikhaAccordion');
  const sokolovoAccordion = document.getElementById('sokolovoAccordion');

  const financeAccordions = [dupSecond[0], dupLast[0]].filter(Boolean);
  const salesAccordions = [dupLast[1], balashikhaAccordion, sokolovoAccordion].filter(Boolean);

  const mobileTriggers = [
    {
      trigger: document.getElementById('accordionCardMobileKuvekino'),
      acc: dupLast[1] || null,
    },
    {
      trigger: document.getElementById('accordionCardMobileBalashikha'),
      acc: balashikhaAccordion,
    },
    {
      trigger: document.getElementById('accordionCardMobileSokolovo'),
      acc: sokolovoAccordion,
    },
  ];

  const listSenkino = document.getElementById('listSenkino');
  const listKuvekino = document.getElementById('listKuvekino');
  const listBalashikha = document.getElementById('listBalashikha');
  const listSokolovo = document.getElementById('listSokolovo');
  const closeListSenk = document.getElementById('closeListSenk');
  const closeListKuv = document.getElementById('closeListKuv');
  const closeListBal = document.getElementById('closeListBal');
  const closeListSok = document.getElementById('closeListSok');

  closeListSenk?.addEventListener('click', (e) => {
    e.stopPropagation();
    listSenkino?.classList.add('hidden');
  });

  closeListKuv?.addEventListener('click', (e) => {
    e.stopPropagation();
    listKuvekino?.classList.add('hidden');
  });

  closeListBal?.addEventListener('click', (e) => {
    e.stopPropagation();
    listBalashikha?.classList.add('hidden');
  });

  closeListSok?.addEventListener('click', (e) => {
    e.stopPropagation();
    listSokolovo?.classList.add('hidden');
  });

  function hideLists() {
    listSenkino?.classList.add('hidden');
    listKuvekino?.classList.add('hidden');
    listBalashikha?.classList.add('hidden');
    listSokolovo?.classList.add('hidden');
  }

  function isSalesAccordion(acc) {
    return Boolean(acc?.closest('#Sales'));
  }

  function showListForAccordion(acc) {
    if (window.innerWidth < 768) {
      hideLists();
      return;
    }
    hideLists();
    if (!acc || !isSalesAccordion(acc)) return;
    if (acc.id === 'secondAccordion') listSenkino?.classList.remove('hidden');
    if (acc.id === 'lastAccordion') listKuvekino?.classList.remove('hidden');
    if (acc.id === 'balashikhaAccordion') listBalashikha?.classList.remove('hidden');
    if (acc.id === 'sokolovoAccordion') listSokolovo?.classList.remove('hidden');
  }

  function getAvailableHeightPx(card) {
    const wrap = card.parentElement;
    if (!wrap) return card.scrollHeight;

    const siblingsHeight = Array.from(wrap.children)
      .filter((el) => el !== card)
      .reduce((sum, el) => sum + el.offsetHeight, 0);

    const available = wrap.clientHeight - siblingsHeight;
    return Math.max(0, available || 0);
  }

  function closeFinanceAccordions() {
    financeAccordions.forEach((acc) => {
      const card = acc.querySelector('.accordionCard');
      if (!card) return;
      card.style.maxHeight = '0px';
      card.classList.remove('is-open');
    });
  }

  function openFinanceCard(card) {
    card.classList.add('is-open');
    card.style.maxHeight = card.scrollHeight + 'px';
  }

  function closeSalesAccordions() {
    hideLists();
    salesAccordions.forEach((acc) => {
      if (!acc) return;
      const card = acc.querySelector('.accordionCard');
      if (!card) return;

      card.style.maxHeight = card.offsetHeight + 'px';
      requestAnimationFrame(() => {
        card.style.maxHeight = '0px';
      });

      card.style.height = '';
      card.style.flex = '';
      const wrap = card.parentElement;
      if (wrap) wrap.style.height = '';

      acc.style.flex = '';
      acc.classList.remove('prior');
      card.classList.remove('is-open');
    });
  }

  function openSalesCard(acc, card) {
    if (!acc) return;
    showListForAccordion(acc);
    card.classList.add('is-open');
    acc.classList.add('prior');
    acc.style.flex = '1 1 0%';

    const wrap = card.parentElement;
    if (wrap) wrap.style.height = '100%';

    card.style.maxHeight = '0px';
    requestAnimationFrame(() => {
      const target = getAvailableHeightPx(card) || card.scrollHeight;
      card.style.maxHeight = target + 'px';
    });

    const onEnd = (e) => {
      if (e.propertyName !== 'max-height') return;
      card.removeEventListener('transitionend', onEnd);
      if (!card.classList.contains('is-open')) return;
      card.style.flex = '1 1 auto';
      card.style.height = '100%';
      card.style.maxHeight = 'none';
    };
    card.addEventListener('transitionend', onEnd);
  }

  const isMobile = () => window.innerWidth < 768;

  closeSalesAccordions();

  closeFinanceAccordions();
  const firstFinanceCard = financeAccordions[0]?.querySelector('.accordionCard');
  if (firstFinanceCard) {
    openFinanceCard(firstFinanceCard);
  }

  financeAccordions.forEach((acc) => {
    acc.addEventListener('click', () => {
      hideLists();
      const card = acc.querySelector('.accordionCard');
      if (!card) return;
      closeFinanceAccordions();
      openFinanceCard(card);
    });
  });

  salesAccordions.forEach((acc) => {
    if (!acc) return;
    acc.addEventListener('click', () => {
      if (isMobile()) return;
      const card = acc.querySelector('.accordionCard');
      if (!card) return;

      const wasOpen = card.classList.contains('is-open');
      closeSalesAccordions();
      if (!wasOpen) openSalesCard(acc, card);
    });
  });

  mobileTriggers.forEach(({ trigger, acc }) => {
    if (!trigger || !acc) return;
    trigger.addEventListener('click', (e) => {
      if (!isMobile()) return;
      e.stopPropagation();
      const card = acc.querySelector('.accordionCard');
      if (!card) return;

      const wasOpen = card.classList.contains('is-open');
      closeSalesAccordions();
      if (!wasOpen) openSalesCard(acc, card);
    });
  });
});
