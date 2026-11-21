/*
 * Chim Nhỏ Phiêu Lưu — cơ chế Flappy Bird bằng jQuery.
 * Các mức điểm và interval được giữ đúng theo yêu cầu của giảng viên.
 */
$(function () {
  'use strict';

  var $board = $('#container');
  var $bird = $('#bird');
  var $pipeTop = $('#pole_1');
  var $pipeBottom = $('#pole_2');
  var $score = $('#score');
  var $level = $('#level_value');
  var $highScore = $('#high_score');
  var $overlay = $('#game_overlay');
  var $pauseButton = $('#pause_btn');
  var $playButton = $('#play_btn');
  var $restartButton = $('#restart_btn');
  var $levelToast = $('#level_toast');
  var highScoreKey = 'kieu-oanh-flappy-high-score-v1';

  // Bảng interval cố định theo đề bài, dùng trực tiếp để chạy vòng lặp.
  var levelSettings = {
    1: { interval: 40, speed: 132, gap: 232 },
    2: { interval: 30, speed: 150, gap: 222 },
    3: { interval: 25, speed: 168, gap: 212 },
    4: { interval: 20, speed: 184, gap: 200 }
  };

  var state = {
    timer: null,
    interval: 40,
    running: false,
    paused: false,
    finished: false,
    score: 0,
    level: 1,
    highScore: readHighScore(),
    birdY: 0,
    birdVelocity: 0,
    flapHeld: false,
    pipeX: 0,
    pipeTopHeight: 0,
    pipeGap: 0,
    pipeWidth: 0,
    pipeScored: false,
    lastTick: 0
  };

  function readHighScore() {
    try {
      return Math.max(0, parseInt(window.localStorage.getItem(highScoreKey), 10) || 0);
    } catch (error) {
      return 0;
    }
  }

  function saveHighScore() {
    try {
      window.localStorage.setItem(highScoreKey, String(state.highScore));
    } catch (error) {
      // Private browsing may block storage; the game can still be played.
    }
  }

  function getLevelForScore(score) {
    if (score >= 40) return 4;
    if (score >= 20) return 3;
    if (score >= 5) return 2;
    return 1;
  }

  function getBoardSize() {
    return { width: $board.innerWidth(), height: $board.innerHeight() };
  }

  function getBirdSize() {
    return { width: $bird.outerWidth(), height: $bird.outerHeight() };
  }

  function clearGameTimer() {
    if (state.timer !== null) {
      window.clearInterval(state.timer);
      state.timer = null;
    }
  }

  function startGameTimer() {
    clearGameTimer();
    state.lastTick = window.performance && window.performance.now ? window.performance.now() : Date.now();
    state.timer = window.setInterval(gameTick, state.interval);
  }

  function setOverlay(kicker, title, message, emoji, showPlay, showRestart) {
    $('#overlay_kicker').text(kicker);
    $('#overlay_title').text(title);
    $('#overlay_message').html(message);
    $('#overlay_emoji').text(emoji);
    $playButton.prop('hidden', !showPlay);
    $restartButton.prop('hidden', !showRestart);
    $overlay.removeClass('is-hidden');
  }

  function hideOverlay() {
    $overlay.addClass('is-hidden');
  }

  function showLevelToast(level) {
    $levelToast.removeClass('show');
    // Force reflow so the small level-up animation can be replayed.
    void $levelToast[0].offsetWidth;
    $levelToast.text('LÊN LEVEL ' + level + ' · NHỊP BAY MỚI!').addClass('show');
  }

  function setLevel(nextLevel, announce) {
    if (nextLevel === state.level && state.timer !== null) return;
    var changed = nextLevel !== state.level;
    // Clear interval cũ trước; chỉ tạo interval mới nếu game đang chạy.
    clearGameTimer();
    state.level = nextLevel;
    state.interval = levelSettings[nextLevel].interval;
    $level.text(nextLevel);
    $board.attr('data-level', nextLevel);
    if (changed && announce) showLevelToast(nextLevel);
    if (state.running && !state.paused && !state.finished) startGameTimer();
  }

  // Chỉ gọi khi khởi tạo game hoặc tạo cặp cột mới ngoài mép phải.
  // Chiều cao và khe hở được chọn một lần, sau đó giữ nguyên suốt vòng đời cặp cột.
  function createPipePair(startX) {
    var board = getBoardSize();
    var settings = levelSettings[state.level];
    var birdHeight = getBirdSize().height;
    var groundHeight = 43;
    state.pipeGap = Math.min(settings.gap, board.height - birdHeight - groundHeight - 70);
    var minTop = 42;
    var maxTop = Math.max(minTop + 1, board.height - groundHeight - state.pipeGap - 42);
    state.pipeTopHeight = minTop + Math.random() * (maxTop - minTop);
    state.pipeWidth = Math.max(42, board.width * 0.14);
    state.pipeX = startX;
    $pipeTop.css({ left: state.pipeX, width: state.pipeWidth, height: state.pipeTopHeight });
    $pipeBottom.css({ left: state.pipeX, width: state.pipeWidth, top: state.pipeTopHeight + state.pipeGap, height: board.height - groundHeight - state.pipeTopHeight - state.pipeGap });
  }

  // Mỗi frame chỉ đổi tọa độ ngang; không đụng đến top/height/gap của hai cột.
  function movePipePair() {
    $pipeTop.css('left', state.pipeX);
    $pipeBottom.css('left', state.pipeX);
  }

  function prepareBoard() {
    var board = getBoardSize();
    state.birdY = board.height * 0.43;
    state.birdVelocity = 0;
    state.pipeScored = false;
    $bird.css({ top: state.birdY, transform: 'rotate(0deg)' }).removeClass('falling');
    createPipePair(board.width + 80);
  }

  function updateBird(deltaSeconds) {
    var gravity = 690;
    if (state.flapHeld) {
      // Giữ phím tạo lực nâng có giới hạn; thả phím để trọng lực kéo chim xuống.
      state.birdVelocity = Math.max(-285, state.birdVelocity - 920 * deltaSeconds);
    } else {
      state.birdVelocity = Math.min(390, state.birdVelocity + gravity * deltaSeconds);
    }
    state.birdY += state.birdVelocity * deltaSeconds;
    var tilt = Math.max(-24, Math.min(62, state.birdVelocity * 0.12));
    $bird.css({ top: state.birdY, transform: 'rotate(' + tilt + 'deg)' });
    $bird.toggleClass('falling', state.birdVelocity > 90);
  }

  function collidesWith($obstacle, birdRect) {
    var pipe = $obstacle[0].getBoundingClientRect();
    return birdRect.right > pipe.left + 3 && birdRect.left < pipe.right - 3 && birdRect.bottom > pipe.top + 2 && birdRect.top < pipe.bottom - 2;
  }

  function endGame(won) {
    if (state.finished) return;
    clearGameTimer();
    state.running = false;
    state.paused = false;
    state.finished = true;
    state.flapHeld = false;
    $pauseButton.prop('disabled', true).attr('aria-label', 'Tạm dừng');
    if (state.score > state.highScore) {
      state.highScore = state.score;
      saveHighScore();
      $highScore.text(state.highScore);
    }
    if (won) {
      setOverlay('BẠN ĐÃ CHINH PHỤC BẦU TRỜI', 'CHIẾN THẮNG!', 'Bạn đạt đủ <strong>50 điểm</strong>. Một chuyến bay tuyệt đẹp!', '🏆', false, true);
    } else {
      setOverlay('CHUYẾN BAY KẾT THÚC', 'Game Over', 'Bạn ghi được <strong>' + state.score + ' điểm</strong>. Thử thêm một chuyến nữa nhé!', '🪽', false, true);
    }
  }

  function gameTick() {
    if (!state.running || state.paused || state.finished) return;
    var now = window.performance && window.performance.now ? window.performance.now() : Date.now();
    var deltaSeconds = Math.min(0.06, Math.max(0.001, (now - state.lastTick) / 1000));
    state.lastTick = now;
    var board = getBoardSize();

    updateBird(deltaSeconds);
    state.pipeX -= levelSettings[state.level].speed * deltaSeconds;
    movePipePair();

    var birdRect = $bird[0].getBoundingClientRect();
    var groundTop = $board[0].getBoundingClientRect().bottom - 43;
    if (birdRect.top <= $board[0].getBoundingClientRect().top || birdRect.bottom >= groundTop || collidesWith($pipeTop, birdRect) || collidesWith($pipeBottom, birdRect)) {
      endGame(false);
      return;
    }

    var pipeWidth = state.pipeWidth;
    var birdLeft = $bird[0].getBoundingClientRect().left;
    if (!state.pipeScored && state.pipeX + pipeWidth < birdLeft) {
      state.pipeScored = true;
      state.score += 1;
      $score.text(state.score);
      if (state.score > state.highScore) {
        state.highScore = state.score;
        $highScore.text(state.highScore);
        saveHighScore();
      }
      var nextLevel = getLevelForScore(state.score);
      if (state.score >= 50) {
        endGame(true);
        return;
      }
      if (nextLevel !== state.level) setLevel(nextLevel, true);
    }

    if (state.pipeX + pipeWidth < 0) {
      var gapBeforeNextPair = Math.max(205, board.width * 0.62);
      state.pipeScored = false;
      createPipePair(board.width + gapBeforeNextPair);
    }
  }

  function startGame() {
    clearGameTimer();
    state.running = false;
    state.paused = false;
    state.finished = false;
    state.score = 0;
    state.level = 1;
    state.interval = levelSettings[1].interval;
    state.flapHeld = false;
    $score.text('0');
    $level.text('1');
    $board.attr('data-level', '1');
    $pauseButton.prop('disabled', false).attr('aria-label', 'Tạm dừng');
    prepareBoard();
    state.running = true;
    hideOverlay();
    startGameTimer();
  }

  function togglePause() {
    if (!state.running || state.finished) return;
    if (state.paused) {
      state.paused = false;
      hideOverlay();
      $pauseButton.attr('aria-label', 'Tạm dừng').attr('title', 'Tạm dừng (P)').find('.pause-icon').text('Ⅱ');
      startGameTimer();
    } else {
      clearGameTimer();
      state.paused = true;
      state.flapHeld = false;
      $pauseButton.attr('aria-label', 'Tiếp tục').attr('title', 'Tiếp tục (P)').find('.pause-icon').text('▶');
      setOverlay('NGHỈ MỘT NHỊP', 'Đang tạm dừng', 'Nhấn <kbd>P</kbd> hoặc nút tiếp tục khi bạn sẵn sàng.', '☁️', false, false);
      $restartButton.prop('hidden', false).text('Tiếp tục chơi ▶');
    }
  }

  function resumeFromOverlay() {
    if (state.paused) {
      $restartButton.prop('hidden', true).html('Chơi lại <span aria-hidden="true">↻</span>');
      togglePause();
    } else {
      startGame();
    }
  }

  // Các hàm thuần này giúp kiểm tra chính xác ranh giới level mà không chạy game.
  window.FlappyBirdRules = Object.freeze({
    levelForScore: getLevelForScore,
    intervalForLevel: function (level) { return levelSettings[level].interval; },
    levelSettings: Object.freeze({ 1: 40, 2: 30, 3: 25, 4: 20 })
  });

  $highScore.text(state.highScore);
  prepareBoard();
  $playButton.on('click', startGame);
  $restartButton.on('click', resumeFromOverlay);
  $pauseButton.on('click', togglePause);

  // Chỉ bàn phím điều khiển chim; không gắn mousedown/mouseup/click lên khung game.
  $(document).on('keydown.flappyBird', function (event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (state.running && !state.paused && !state.finished) state.flapHeld = true;
      return;
    }
    if (event.key === 'Enter' && !event.repeat) {
      if (!state.running || state.paused || state.finished) {
        event.preventDefault();
        resumeFromOverlay();
      }
      return;
    }
    if ((event.key === 'p' || event.key === 'P') && !event.repeat) togglePause();
  });
  $(document).on('keyup.flappyBird', function (event) {
    if (event.key === 'ArrowDown') state.flapHeld = false;
  });
  $(window).on('blur.flappyBird', function () { state.flapHeld = false; });
});
