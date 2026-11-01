/**
 * WealthyWidgets v2.2.0 — Standalone Web Components & Embeddable Widget Library
 * Works in pure HTML, WordPress, Shopify, React, Vue, Next.js, and any browser.
 * Author: anom-developer (https://github.com/anom-developer/wealthywidgets)
 */
(function(global) {
  'use strict';

  // --- Auto-inject default CSS if not loaded ---
  function injectDefaultStyles() {
    if (typeof document === 'undefined' || document.getElementById('wealthywidgets-auto-css')) return;
    var link = document.createElement('link');
    link.id = 'wealthywidgets-auto-css';
    link.rel = 'stylesheet';
    link.href = (document.currentScript && document.currentScript.src)
      ? document.currentScript.src.replace(/wealthywidgets(\.min)?\.js$/, 'styles.css')
      : './dist/styles.css';
    document.head.appendChild(link);
  }
  injectDefaultStyles();

  // --- Currencies & Rates ---
  var CURRENCIES = {
    USD: { sym: '$', rate: 1 },
    EUR: { sym: '€', rate: 0.92 },
    GBP: { sym: '£', rate: 0.78 },
    JPY: { sym: '¥', rate: 152.3 },
    RUB: { sym: '₽', rate: 96.5 }
  };

  function formatPrice(val, curr) {
    var c = CURRENCIES[curr] || CURRENCIES.USD;
    var converted = val * c.rate;
    var dec = converted >= 1000 ? 2 : (converted < 1 ? 4 : 2);
    return c.sym + converted.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }

  // --- Built-in Fallback Market Data ---
  var FINANCE_DATA = {
    BTC: { name: 'Bitcoin', sym: 'BTC', price: 64280.5, change: 3.42, high: 65100, low: 62800, vol: '$28.4B', cap: '$1.26T', icon: '₿', spark: [62800, 63100, 62900, 63500, 63800, 64100, 64280] },
    ETH: { name: 'Ethereum', sym: 'ETH', price: 3450.2, change: -1.18, high: 3520, low: 3410, vol: '$14.2B', cap: '$415B', icon: 'Ξ', spark: [3510, 3500, 3480, 3430, 3420, 3440, 3450] },
    SOL: { name: 'Solana', sym: 'SOL', price: 154.3, change: 7.15, high: 156.0, low: 142.5, vol: '$4.1B', cap: '$72.5B', icon: '◎', spark: [142.5, 144.0, 147.2, 149.0, 152.4, 154.3] },
    BNB: { name: 'BNB', sym: 'BNB', price: 588.6, change: 2.14, high: 595.0, low: 580.2, vol: '$1.2B', cap: '$87.5B', icon: '🔶', spark: [580, 582, 585, 584, 587, 588.6] },
    DOGE: { name: 'Dogecoin', sym: 'DOGE', price: 0.165, change: 5.82, high: 0.172, low: 0.154, vol: '$1.9B', cap: '$24.1B', icon: '🐕', spark: [0.154, 0.158, 0.161, 0.159, 0.163, 0.165] },
    XRP: { name: 'XRP', sym: 'XRP', price: 0.542, change: -0.65, high: 0.555, low: 0.538, vol: '$850M', cap: '$30.5B', icon: '✕', spark: [0.55, 0.548, 0.542, 0.54, 0.541, 0.542] },
    AAPL: { name: 'Apple Inc.', sym: 'AAPL', price: 228.45, change: 1.85, high: 229.8, low: 226.1, vol: '$6.8B', cap: '$3.49T', icon: '', spark: [226.1, 226.8, 227.4, 227.0, 228.1, 228.45] },
    NVDA: { name: 'NVIDIA Corp.', sym: 'NVDA', price: 138.2, change: 4.62, high: 139.5, low: 133.0, vol: '$18.9B', cap: '$3.38T', icon: '🟢', spark: [133.0, 134.2, 135.5, 136.0, 137.8, 138.2] },
    TSLA: { name: 'Tesla Inc.', sym: 'TSLA', price: 218.9, change: -2.45, high: 224.5, low: 216.0, vol: '$11.2B', cap: '$698B', icon: '⚡', spark: [224.5, 222.0, 220.5, 217.8, 219.4, 218.9] }
  };

  // --- Real Live API: Binance Public 24hr Ticker ---
  function fetchLiveCrypto(symbol, cb) {
    symbol = symbol.toUpperCase();
    var isCrypto = ['BTC', 'ETH', 'SOL', 'BNB', 'DOGE', 'XRP', 'ADA', 'AVAX', 'DOT', 'NEAR', 'LINK'].indexOf(symbol) !== -1;
    if (!isCrypto || typeof fetch === 'undefined') {
      if (cb) cb(FINANCE_DATA[symbol] || null, false);
      return;
    }

    var pair = symbol + 'USDT';
    var url = 'https://api.binance.com/api/v3/ticker/24hr?symbol=' + pair;
    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = controller ? setTimeout(function() { controller.abort(); }, 4000) : null;

    fetch(url, controller ? { signal: controller.signal } : {})
      .then(function(res) {
        if (timer) clearTimeout(timer);
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then(function(data) {
        var base = FINANCE_DATA[symbol] || { name: symbol, sym: symbol, icon: '💎' };
        var price = parseFloat(data.lastPrice);
        var change = parseFloat(data.priceChangePercent);
        var high = parseFloat(data.highPrice);
        var low = parseFloat(data.lowPrice);
        var volUsd = (parseFloat(data.quoteVolume) / 1e9).toFixed(1) + 'B';
        var spark = base.spark ? base.spark.slice(0, -1).concat([price]) : [low, price * 0.99, price * 1.01, high, price];

        var merged = {
          name: base.name,
          sym: symbol,
          price: price,
          change: change,
          high: high,
          low: low,
          vol: '$' + volUsd,
          cap: base.cap || 'Live',
          icon: base.icon || '🪙',
          spark: spark
        };
        if (cb) cb(merged, true);
      })
      .catch(function() {
        if (cb) cb(FINANCE_DATA[symbol] || null, false);
      });
  }

  // --- Real Live API: Open-Meteo Weather ---
  var WMO_CODES = {
    0: { text: 'Clear Sky', iconDay: '☀️', iconNight: '🌙' },
    1: { text: 'Mainly Clear', iconDay: '🌤️', iconNight: '🌤️' },
    2: { text: 'Partly Cloudy', iconDay: '⛅', iconNight: '⛅' },
    3: { text: 'Overcast', iconDay: '☁️', iconNight: '☁️' },
    45: { text: 'Fog', iconDay: '🌫️', iconNight: '🌫️' },
    48: { text: 'Depositing Rime Fog', iconDay: '🌫️', iconNight: '🌫️' },
    51: { text: 'Light Drizzle', iconDay: '🌦️', iconNight: '🌦️' },
    53: { text: 'Moderate Drizzle', iconDay: '🌦️', iconNight: '🌦️' },
    55: { text: 'Dense Drizzle', iconDay: '🌧️', iconNight: '🌧️' },
    61: { text: 'Slight Rain', iconDay: '🌧️', iconNight: '🌧️' },
    63: { text: 'Moderate Rain', iconDay: '🌧️', iconNight: '🌧️' },
    65: { text: 'Heavy Rain', iconDay: '🌧️', iconNight: '🌧️' },
    71: { text: 'Slight Snow', iconDay: '🌨️', iconNight: '🌨️' },
    73: { text: 'Moderate Snow', iconDay: '🌨️', iconNight: '🌨️' },
    75: { text: 'Heavy Snow', iconDay: '❄️', iconNight: '❄️' },
    80: { text: 'Rain Showers', iconDay: '🌧️', iconNight: '🌧️' },
    81: { text: 'Moderate Showers', iconDay: '🌧️', iconNight: '🌧️' },
    82: { text: 'Violent Showers', iconDay: '⛈️', iconNight: '⛈️' },
    95: { text: 'Thunderstorm', iconDay: '⛈️', iconNight: '⛈️' },
    96: { text: 'Thunderstorm with Hail', iconDay: '⛈️', iconNight: '⛈️' }
  };

  function fetchLiveWeather(city, cb) {
    if (typeof fetch === 'undefined') {
      if (cb) cb(null, false);
      return;
    }
    var geoUrl = 'https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(city) + '&count=1&language=en&format=json';

    fetch(geoUrl)
      .then(function(res) { return res.json(); })
      .then(function(geoData) {
        if (!geoData.results || !geoData.results.length) throw new Error('City not found');
        var loc = geoData.results[0];
        var lat = loc.latitude;
        var lon = loc.longitude;
        var cityName = loc.name + (loc.country_code ? (', ' + loc.country_code.toUpperCase()) : '');

        var wxUrl = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m';
        return fetch(wxUrl).then(function(wRes) { return wRes.json(); }).then(function(wxData) {
          var cur = wxData.current;
          var code = cur.weather_code;
          var isDay = cur.is_day === 1;
          var meta = WMO_CODES[code] || { text: 'Clear', iconDay: '☀️', iconNight: '🌙' };
          var icon = isDay ? meta.iconDay : meta.iconNight;

          var result = {
            city: cityName,
            temp: Math.round(cur.temperature_2m),
            feelsLike: Math.round(cur.apparent_temperature),
            cond: meta.text,
            icon: icon,
            humidity: cur.relative_humidity_2m,
            wind: cur.wind_speed_10m,
            isLive: true
          };
          if (cb) cb(result, true);
        });
      })
      .catch(function() {
        if (cb) cb(null, false);
      });
  }

  function generateSparkSvg(points, isPos) {
    if (!points || points.length < 2) return '';
    var min = Math.min.apply(null, points);
    var max = Math.max.apply(null, points);
    var range = (max - min) || 1;
    var w = 360, h = 48;
    var coords = points.map(function(p, i) {
      var x = (i / (points.length - 1)) * w;
      var y = h - ((p - min) / range) * (h - 10) - 5;
      return [x, y];
    });
    var d = coords.reduce(function(acc, pt, i) {
      return i === 0 ? ('M ' + pt[0] + ' ' + pt[1]) : (acc + ' L ' + pt[0] + ' ' + pt[1]);
    }, '');
    var fill = d + ' L ' + w + ' ' + h + ' L 0 ' + h + ' Z';
    var color = isPos ? '#10b981' : '#ef4444';
    var gid = 'spark-' + Math.random().toString(36).substr(2, 6);
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;height:48px;overflow:visible;" preserveAspectRatio="none">' +
      '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="' + color + '" stop-opacity="0.35" />' +
      '<stop offset="100%" stop-color="' + color + '" stop-opacity="0" />' +
      '</linearGradient></defs>' +
      '<path d="' + fill + '" fill="url(#' + gid + ')" />' +
      '<path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="2.5" stroke-linecap="round" />' +
      '</svg>';
  }

  // --- Custom Element: <wealthy-finance> ---
  class WealthyFinanceElement extends HTMLElement {
    connectedCallback() {
      var self = this;
      var assetKey = (this.getAttribute('asset') || 'BTC').toUpperCase();
      var currency = (this.getAttribute('currency') || 'USD').toUpperCase();
      var title = this.getAttribute('title') || 'Market Watch';
      var liveAttr = this.getAttribute('live') !== 'false';

      function render(data, isLive) {
        var isPos = data.change >= 0;
        var badgeCls = isPos ? 'ww-finance__badge--pos' : 'ww-finance__badge--neg';
        var badgeSign = isPos ? '▲ +' : '▼ ';
        var liveBadgeHtml = isLive
          ? '<span class="ww-live-badge"><span class="ww-live-badge__dot"></span>LIVE</span>'
          : '';

        self.innerHTML = '<div class="ww-finance">' +
          '<div class="ww-finance__header">' +
            '<div style="display:flex;align-items:center;gap:8px;"><span class="ww-finance__title">' + title + '</span>' + liveBadgeHtml + '</div>' +
            '<span class="ww-badge ww-badge--primary">' + currency + '</span>' +
          '</div>' +
          '<div class="ww-finance__card">' +
            '<div style="display:flex;justify-content:space-between;align-items:flex-start;">' +
              '<div style="display:flex;align-items:center;gap:8px;">' +
                '<span style="font-size:22px;">' + data.icon + '</span>' +
                '<div><div style="font-weight:700;">' + data.name + '</div><div style="font-size:11px;color:#94a3b8;">' + data.sym + '</div></div>' +
              '</div>' +
              '<span class="ww-badge ' + badgeCls + '">' + badgeSign + Math.abs(data.change).toFixed(2) + '%</span>' +
            '</div>' +
            '<div class="ww-finance__price">' + formatPrice(data.price, currency) + '</div>' +
            generateSparkSvg(data.spark, isPos) +
            '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.1);font-size:12px;">' +
              '<div><span style="color:#94a3b8;">24h High:</span> <strong>' + formatPrice(data.high, currency) + '</strong></div>' +
              '<div><span style="color:#94a3b8;">24h Low:</span> <strong>' + formatPrice(data.low, currency) + '</strong></div>' +
              '<div><span style="color:#94a3b8;">Volume:</span> <strong>' + data.vol + '</strong></div>' +
              '<div><span style="color:#94a3b8;">Market Cap:</span> <strong>' + data.cap + '</strong></div>' +
            '</div>' +
          '</div>' +
        '</div>';
      }

      var initialData = FINANCE_DATA[assetKey] || FINANCE_DATA.BTC;
      render(initialData, false);

      if (liveAttr) {
        fetchLiveCrypto(assetKey, function(liveData, isLive) {
          if (liveData) render(liveData, isLive);
        });
      }
    }
  }

  // --- Custom Element: <wealthy-weather> ---
  class WealthyWeatherElement extends HTMLElement {
    connectedCallback() {
      var self = this;
      var city = this.getAttribute('city') || 'London';
      var temp = this.getAttribute('temp') || '18';
      var cond = this.getAttribute('cond') || 'Partly Cloudy';
      var icon = this.getAttribute('icon') || '⛅';
      var unit = (this.getAttribute('unit') || 'C').toUpperCase();
      var liveAttr = this.getAttribute('live') !== 'false';

      function render(cCity, cTemp, cCond, cIcon, isLive) {
        var liveBadge = isLive
          ? '<span class="ww-live-badge" style="background:rgba(255,255,255,0.2);color:#fff;border-color:rgba(255,255,255,0.4);"><span class="ww-live-badge__dot" style="background:#fff;box-shadow:0 0 6px #fff;"></span>LIVE</span>'
          : '';

        self.innerHTML = '<div class="ww-weather" style="background: linear-gradient(135deg, #2563eb, #60a5fa);">' +
          '<div style="display:flex;justify-content:flex-end;margin-bottom:8px;">' + liveBadge + '</div>' +
          '<div class="ww-weather__top">' +
            '<div>' +
              '<div class="ww-weather__main-temp">' + cTemp + '°' + unit + '</div>' +
              '<div class="ww-weather__loc">' + cCity + '</div>' +
              '<div class="ww-weather__cond-text">' + cCond + '</div>' +
            '</div>' +
            '<div class="ww-weather__big-icon">' + cIcon + '</div>' +
          '</div>' +
        '</div>';
      }

      render(city, temp, cond, icon, false);

      if (liveAttr) {
        fetchLiveWeather(city, function(wxData, isLive) {
          if (wxData && isLive) {
            render(wxData.city, wxData.temp, wxData.cond, wxData.icon, true);
          }
        });
      }
    }
  }

  // --- Custom Element: <wealthy-ticker> (NEW!) ---
  class WealthyTickerElement extends HTMLElement {
    connectedCallback() {
      var symbolsAttr = this.getAttribute('symbols') || 'BTC,ETH,SOL,NVDA,AAPL,TSLA';
      var symbols = symbolsAttr.split(',').map(function(s) { return s.trim().toUpperCase(); }).filter(Boolean);
      var currency = (this.getAttribute('currency') || 'USD').toUpperCase();
      var speed = parseInt(this.getAttribute('speed') || '30', 10);
      var theme = this.getAttribute('theme') || 'dark';
      var pauseHover = this.getAttribute('pause-on-hover') !== 'false';
      var liveAttr = this.getAttribute('live') !== 'false';
      var variant = this.getAttribute('variant') || 'default';

      var container = document.createElement('div');
      var rootClasses = ['ww-ticker'];
      if (theme === 'light') rootClasses.push('ww-ticker--light');
      if (variant === 'pill') rootClasses.push('ww-ticker--pill');
      if (pauseHover) rootClasses.push('ww-ticker--pause-hover');
      container.className = rootClasses.join(' ');
      container.setAttribute('role', 'region');
      container.setAttribute('aria-label', 'Live Financial Ticker');

      var badgeHtml = liveAttr
        ? '<div class="ww-ticker__badge"><span class="ww-live-badge"><span class="ww-live-badge__dot"></span>LIVE</span></div>'
        : '';

      container.innerHTML = badgeHtml + '<div class="ww-ticker__viewport"><div class="ww-ticker__track" style="animation-duration:' + speed + 's"></div></div>';
      this.innerHTML = '';
      this.appendChild(container);

      var track = container.querySelector('.ww-ticker__track');

      // Populate items map with defaults
      var itemMap = {};
      symbols.forEach(function(sym) {
        itemMap[sym] = FINANCE_DATA[sym] || {
          name: sym,
          sym: sym,
          price: 100,
          change: 1.5,
          icon: '📊'
        };
      });

      function renderTrack() {
        var itemsHtml = '';
        symbols.forEach(function(sym) {
          var item = itemMap[sym];
          var isPos = item.change >= 0;
          var sign = isPos ? '▲ +' : '▼ ';
          var chgCls = isPos ? 'ww-ticker__change--pos' : 'ww-ticker__change--neg';

          itemsHtml += '<div class="ww-ticker__item" data-symbol="' + sym + '">' +
            (item.icon ? ('<span class="ww-ticker__icon">' + item.icon + '</span>') : '') +
            '<span class="ww-ticker__symbol">' + sym + '</span>' +
            '<span class="ww-ticker__price">' + formatPrice(item.price, currency) + '</span>' +
            '<span class="ww-ticker__change ' + chgCls + '">' + sign + Math.abs(item.change).toFixed(2) + '%</span>' +
          '</div>';
        });
        // Duplicate 3 times for completely seamless infinite loop
        track.innerHTML = itemsHtml + itemsHtml + itemsHtml;
      }

      renderTrack();

      // Poll live crypto data
      if (liveAttr) {
        symbols.forEach(function(sym) {
          fetchLiveCrypto(sym, function(liveData, isLive) {
            if (liveData && isLive) {
              itemMap[sym] = liveData;
              renderTrack();
            }
          });
        });
      }
    }
  }

  // --- Custom Element: <wealthy-activity> ---
  class WealthyActivityElement extends HTMLElement {
    connectedCallback() {
      var title = this.getAttribute('title') || 'Recent Activity';
      this.innerHTML = '<div class="ww-activity">' +
        '<div class="ww-activity__header"><span class="ww-activity__title">' + title + '</span></div>' +
        '<div class="ww-activity__list">' +
          '<div class="ww-activity__item ww-activity__item--success">' +
            '<span class="ww-activity__dot"></span>' +
            '<div class="ww-activity__content"><div class="ww-activity__label">Binance Live API connected</div><div class="ww-activity__time">just now</div></div>' +
          '</div>' +
          '<div class="ww-activity__item ww-activity__item--info">' +
            '<span class="ww-activity__dot"></span>' +
            '<div class="ww-activity__content"><div class="ww-activity__label">Weather forecast synced</div><div class="ww-activity__time">1m ago</div></div>' +
          '</div>' +
          '<div class="ww-activity__item ww-activity__item--primary">' +
            '<span class="ww-activity__dot"></span>' +
            '<div class="ww-activity__content"><div class="ww-activity__label">Ticker Bar mounted</div><div class="ww-activity__time">3m ago</div></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }
  }

  // --- Custom Element: <wealthy-code> ---
  class WealthyCodeElement extends HTMLElement {
    connectedCallback() {
      var title = this.getAttribute('title') || 'snippet.ts';
      var code = this.textContent.trim() || 'console.log("Hello from WealthyWidgets!");';
      this.innerHTML = '<div class="ww-code-widget">' +
        '<div class="ww-code-widget__bar">' +
          '<div class="ww-code-widget__dots">' +
            '<span class="ww-code-widget__dot ww-code-widget__dot--r"></span>' +
            '<span class="ww-code-widget__dot ww-code-widget__dot--y"></span>' +
            '<span class="ww-code-widget__dot ww-code-widget__dot--g"></span>' +
            '<span class="ww-code-widget__filename">' + title + '</span>' +
          '</div>' +
          '<button type="button" class="ww-btn ww-btn--xs ww-btn--secondary" onclick="navigator.clipboard.writeText(\'' + code.replace(/'/g, "\\'") + '\')">Copy</button>' +
        '</div>' +
        '<div class="ww-code-widget__body"><pre style="margin:0;color:#e2e8f0;font-size:13px;line-height:1.6;"><code>' + code + '</code></pre></div>' +
      '</div>';
    }
  }

  // Register Custom Elements if customElements API exists
  if (typeof customElements !== 'undefined') {
    if (!customElements.get('wealthy-finance')) customElements.define('wealthy-finance', WealthyFinanceElement);
    if (!customElements.get('wealthy-weather')) customElements.define('wealthy-weather', WealthyWeatherElement);
    if (!customElements.get('wealthy-ticker')) customElements.define('wealthy-ticker', WealthyTickerElement);
    if (!customElements.get('wealthy-activity')) customElements.define('wealthy-activity', WealthyActivityElement);
    if (!customElements.get('wealthy-code')) customElements.define('wealthy-code', WealthyCodeElement);
  }

  // --- Programmatic API ---
  global.WealthyWidgets = {
    version: '2.2.0',
    fetchLiveCrypto: function(symbol) {
      return new Promise(function(resolve) {
        fetchLiveCrypto(symbol, function(data, isLive) {
          resolve({ data: data, isLive: isLive });
        });
      });
    },
    fetchLiveWeather: function(city) {
      return new Promise(function(resolve) {
        fetchLiveWeather(city, function(data, isLive) {
          resolve({ data: data, isLive: isLive });
        });
      });
    },
    renderTicker: function(selector, opts) {
      opts = opts || {};
      var el = document.querySelector(selector);
      if (!el) return;
      var w = document.createElement('wealthy-ticker');
      if (opts.symbols) w.setAttribute('symbols', Array.isArray(opts.symbols) ? opts.symbols.join(',') : opts.symbols);
      if (opts.currency) w.setAttribute('currency', opts.currency);
      if (opts.speed) w.setAttribute('speed', opts.speed);
      if (opts.theme) w.setAttribute('theme', opts.theme);
      if (opts.variant) w.setAttribute('variant', opts.variant);
      if (opts.live !== undefined) w.setAttribute('live', opts.live ? 'true' : 'false');
      el.appendChild(w);
      return w;
    },
    renderFinance: function(selector, opts) {
      opts = opts || {};
      var el = document.querySelector(selector);
      if (!el) return;
      var w = document.createElement('wealthy-finance');
      if (opts.asset) w.setAttribute('asset', opts.asset);
      if (opts.currency) w.setAttribute('currency', opts.currency);
      if (opts.title) w.setAttribute('title', opts.title);
      if (opts.live !== undefined) w.setAttribute('live', opts.live ? 'true' : 'false');
      el.appendChild(w);
      return w;
    },
    renderWeather: function(selector, opts) {
      opts = opts || {};
      var el = document.querySelector(selector);
      if (!el) return;
      var w = document.createElement('wealthy-weather');
      if (opts.city) w.setAttribute('city', opts.city);
      if (opts.temp) w.setAttribute('temp', opts.temp);
      if (opts.unit) w.setAttribute('unit', opts.unit);
      if (opts.live !== undefined) w.setAttribute('live', opts.live ? 'true' : 'false');
      el.appendChild(w);
      return w;
    },
    renderActivity: function(selector, opts) {
      opts = opts || {};
      var el = document.querySelector(selector);
      if (!el) return;
      var w = document.createElement('wealthy-activity');
      if (opts.title) w.setAttribute('title', opts.title);
      el.appendChild(w);
      return w;
    }
  };

})(typeof window !== 'undefined' ? window : this);
