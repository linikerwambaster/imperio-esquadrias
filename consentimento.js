// Aviso de cookies (LGPD) + Modo de Consentimento do Google (v2).
// Nada do Google é carregado antes de "Aceitar". Quando o Google Ads/GA4 for configurado, basta preencher TAG.
(function () {
  var TAG = "";             // ex.: "AW-123456789" ou "G-XXXXXXX" (fica vazio até a conta do Google Ads existir)
  var CHAVE = "imp-cookies"; // "aceito" ou "recusado"
  var BASE = ((document.currentScript && document.currentScript.src) || "").replace(/consentimento\.js.*$/, "");

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied", wait_for_update: 500 });

  function ler() {
    try { var v = localStorage.getItem(CHAVE); if (v) return v; } catch (e) {}
    var m = document.cookie.match("(^|;)\\s*" + CHAVE + "=([^;]*)");
    return m ? m[2] : "";
  }
  function gravar(v) {
    try { localStorage.setItem(CHAVE, v); } catch (e) {}
    document.cookie = CHAVE + "=" + v + ";path=/;max-age=15552000;SameSite=Lax";
  }

  var carregado = false;
  function ligar() {
    gtag("consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" });
    try { window.dispatchEvent(new Event("cookies-aceitos")); } catch (e) {}
    if (!TAG || carregado) return;
    carregado = true;
    var s = document.createElement("script");
    s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + TAG;
    document.head.appendChild(s);
    gtag("js", new Date()); gtag("config", TAG);
  }
  function desligar() {
    gtag("consent", "update", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" });
  }

  var aviso = null;
  function estilo() {
    if (document.getElementById("imp-cookies-css")) return;
    var c = document.createElement("style");
    c.id = "imp-cookies-css";
    c.textContent =
      ".imp-aviso{position:fixed;left:10px;right:10px;bottom:10px;z-index:9999;max-width:520px;margin:0 auto;background:#14191E;color:#eef3f7;" +
      "border:1px solid #2b343c;border-top:4px solid #3A9AD3;border-radius:16px;padding:16px 18px;box-shadow:0 18px 40px rgba(0,0,0,.55);" +
      "font-family:'Manrope',system-ui,sans-serif;font-size:.95rem;line-height:1.45;transform:translateY(140%);transition:transform .4s cubic-bezier(.2,.8,.2,1)}" +
      ".imp-aviso.mostra{transform:none}.imp-aviso p{margin:0 0 12px}.imp-aviso a{color:#3A9AD3;font-weight:700}" +
      ".imp-aviso .imp-b{display:flex;gap:10px}.imp-aviso button{flex:1;min-height:46px;border-radius:999px;font:800 .95rem 'Manrope',system-ui,sans-serif;cursor:pointer}" +
      ".imp-aviso .imp-r{background:transparent;color:#eef3f7;border:1.5px solid #eef3f7}.imp-aviso .imp-a{background:#1C6FA0;color:#fff;border:1.5px solid #1C6FA0}" +
      ".imp-aviso button:focus-visible{outline:3px solid #fff;outline-offset:2px}" +
      ".imp-aberto .barra,.imp-aberto .fab-wa,.imp-aberto .fab-nota{visibility:hidden}" +
      "@media(min-width:940px){.imp-aviso{left:auto;right:18px;bottom:18px;max-width:400px;margin:0}}";
    document.head.appendChild(c);
  }
  function fechar() {
    if (!aviso) return;
    aviso.classList.remove("mostra");
    document.documentElement.classList.remove("imp-aberto");
    var a = aviso; aviso = null;
    setTimeout(function () { a.remove(); }, 450);
  }
  function abrir() {
    if (aviso) return;
    estilo();
    aviso = document.createElement("div");
    aviso.className = "imp-aviso";
    aviso.setAttribute("role", "dialog");
    aviso.setAttribute("aria-label", "Aviso de cookies");
    aviso.innerHTML = '<p>Usamos cookies para medir as visitas e os anúncios do site e para mostrar o mapa do Google. Você escolhe se aceita. <a href="' + BASE + 'privacidade/">Saiba mais</a></p>' +
      '<div class="imp-b"><button type="button" class="imp-r">Recusar</button><button type="button" class="imp-a">Aceitar</button></div>';
    aviso.querySelector(".imp-a").addEventListener("click", function () { gravar("aceito"); fechar(); ligar(); });
    aviso.querySelector(".imp-r").addEventListener("click", function () { gravar("recusado"); fechar(); desligar(); });
    document.body.appendChild(aviso);
    document.documentElement.classList.add("imp-aberto");
    setTimeout(function () { if (aviso) aviso.classList.add("mostra"); }, 40);
  }
  document.addEventListener("click", function (e) {
    var l = e.target.closest && e.target.closest("[data-cookies]");
    if (!l) return;
    e.preventDefault();
    abrir();
  });
  function pronto(fn) { if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn); else fn(); }
  var escolha = ler();
  if (escolha === "aceito") ligar();
  else if (escolha !== "recusado") pronto(function () { setTimeout(abrir, 2500); });
})();
