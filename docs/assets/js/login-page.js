var r=n=>{throw TypeError(n)};var a=(n,t,o)=>t.has(n)||r("Cannot "+o);var u=(n,t,o)=>(a(n,t,"read from private field"),o?o.call(n):t.get(n)),s=(n,t,o)=>t.has(n)?r("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(n):t.set(n,o),d=(n,t,o,l)=>(a(n,t,"write to private field"),l?l.call(n,o):t.set(n,o),o),m=(n,t,o)=>(a(n,t,"access private method"),o);import b from"./login-presenter.js";import{A as p,S as f}from"./index.js";var e,i,c;class y{constructor(){s(this,i);s(this,e,null)}async render(){return`
      <section class="login-container">
        <article class="login-form-container">
          <h1 class="login__title">Masuk akun</h1>

          <form id="login-form" class="login-form">
            <div class="form-control">
              <label for="email-input" class="login-form__email-title">Email</label>

              <div class="login-form__title-container">
                <input id="email-input" type="email" name="email" placeholder="Contoh: nama@email.com">
              </div>
            </div>
            <div class="form-control">
              <label for="password-input" class="login-form__password-title">Password</label>

              <div class="login-form__title-container">
                <input id="password-input" type="password" name="password" placeholder="Masukkan password Anda">
              </div>
            </div>
            <div class="form-buttons login-form__form-buttons">
              <div id="submit-button-container">
                <button class="btn" type="submit">Masuk</button>
              </div>
              <p class="login-form__do-not-have-account">Belum punya akun? <a href="#/register">Daftar</a></p>
            </div>
          </form>
        </article>
      </section>
    `}async afterRender(){d(this,e,new b({view:this,model:f,authModel:p})),m(this,i,c).call(this)}loginSuccessfully(t){alert(t),console.log(t),location.hash="/",window.broadcastAuth("login")}loginFailed(t){alert(t),console.log(t)}showSubmitLoadingButton(){document.getElementById("submit-button-container")&&(document.getElementById("submit-button-container").innerHTML=`
        <button class="btn" type="submit" disabled>
          <i class="fas fa-spinner loader-button"></i> Masuk
        </button>
      `)}hideSubmitLoadingButton(){document.getElementById("submit-button-container")&&(document.getElementById("submit-button-container").innerHTML=`
        <button class="btn" type="submit">Masuk</button>
      `)}}e=new WeakMap,i=new WeakSet,c=function(){document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const o={email:document.getElementById("email-input").value,password:document.getElementById("password-input").value};await u(this,e).getLogin(o)})};export{y as default};
