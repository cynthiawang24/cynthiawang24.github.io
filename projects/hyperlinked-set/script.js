$(document).ready(function() {
  let isPaused = false;

  $('.link > a').click(function(e) {
    e.preventDefault();

    const $nestedLinks = $(this).parent().find('.nested-links');
    $('.nested-links').not($nestedLinks).hide();
    $nestedLinks.toggle();
  });

  // Pause
  function pauseAnimation() {
    clearInterval(interval);
    isPaused = true;
    $('#play').prop('disabled', false);
    $('#pause').prop('disabled', true);
    $('.moon, .disc').css('animation-play-state', 'paused');
  }
  
  // Play
  function playAnimation() {
    if (isPaused) {
      isPaused = false;
      $('#play').prop('disabled', true);
      $('#pause').prop('disabled', false);
      $('.moon, .disc').css('animation-play-state', 'running');
    }
  }
  
  // Restart
  function restartAnimation() {
    clearInterval(interval);
    $images.removeClass('active');
    currentIndex = 0;
    $images.eq(currentIndex).addClass('active');
    clearInterval(cycleInterval);
    clearInterval(dayInterval);
    cycleDisplay = 1;
    dayDisplay = 1.0;
    $('#cycleDisplay').text(cycleDisplay);
    $('#dayDisplay').text(dayDisplay);
  
    $('.moon, .disc').css({
      'animation': 'none',
      'animation': ''
    });

    setTimeout(() => {
      $('.moon, .disc').css('animation', 'rotate 15s linear infinite, flip 15s steps(2) infinite');
    }, 10);
  
    startCycle();
    $('#play').prop('disabled', true);
    $('#pause').prop('disabled', false);
  }

  $('#pause').click(function() {
    console.log('Pause clicked');
    pauseAnimation();
    $(this).css('fill', 'var(--yellow)');
    $('#play').css('fill', '');
    $('#restart').css('fill', '');
  });

  $('#play').click(function() {
    console.log('Play clicked');
    playAnimation();
    $(this).css('fill', 'var(--yellow)');
    setTimeout(() => $(this).css('fill', ''), 300);
  });

  $('#restart').click(function() {
    console.log('Restart clicked');
    restartAnimation();
    $(this).css('fill', 'var(--yellow)');
    setTimeout(() => $(this).css('fill', ''), 300);
  });

  let cycleDisplay = 1;
  let dayDisplay = 1.0;
  let cycleInterval, dayInterval;

  function updateCycle() {
    cycleDisplay = (cycleDisplay % 12) + 1;
    $('#cycleDisplay').text(cycleDisplay);
    changeLinkColor();
  }

  function updateDay() {
    dayDisplay = (dayDisplay >= 29.5) ? 1.0 : parseFloat((dayDisplay + 0.1).toFixed(1));
    $('#dayDisplay').text(Math.floor(dayDisplay));
    changeLinkColor();
  }

  function startCycle() {
    cycleInterval = setInterval(updateCycle, 15000);
    dayInterval = setInterval(updateDay, 52.63157894736842);
  }

  startCycle();

  function changeLinkColor() {
    $('.link a').css('color', '');
    if (cycleDisplay === 1 && dayDisplay >= 1.0 && dayDisplay < 4.0) {
      $('.link:has(a:contains("春节")) a').css('color', 'var(--yellow)');
    }
    if (cycleDisplay === 1 && dayDisplay >= 15.0 && dayDisplay < 18.0) {
      $('.link:has(a:contains("元宵节")) a').css('color', 'var(--yellow)');
    }
    if (cycleDisplay === 5 && dayDisplay >= 15.0 && dayDisplay < 18.0) {
      $('.link:has(a:contains("端午节")) a').css('color', 'var(--yellow)');
    }
    if (cycleDisplay === 7 && dayDisplay >= 15.0 && dayDisplay < 18.0) {
      $('.link:has(a:contains("七夕")) a').css('color', 'var(--yellow)');
    }
    if (cycleDisplay === 8 && dayDisplay >= 15.0 && dayDisplay < 18.0) {
      $('.link:has(a:contains("中秋节")) a').css('color', 'var(--yellow)');
    }
    if (cycleDisplay === 9 && dayDisplay >= 9.0 && dayDisplay < 12.0) {
      $('.link:has(a:contains("重阳节")) a').css('color', 'var(--yellow)');
    }
  }
});