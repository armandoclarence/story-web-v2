var g=o=>{throw TypeError(o)};var m=(o,t,n)=>t.has(o)||g("Cannot "+n);var i=(o,t,n)=>(m(o,t,"read from private field"),n?n.call(o):t.get(o)),a=(o,t,n)=>t.has(o)?g("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(o):t.set(o,n),l=(o,t,n,e)=>(m(o,t,"write to private field"),e?e.call(o,n):t.set(o,n),n),p=(o,t,n)=>(m(o,t,"access private method"),n);import{A as b,S as f}from"./index.js";var s,r,u;class y{constructor({view:t,model:n,authModel:e}){a(this,s);a(this,r);a(this,u);l(this,s,t),l(this,r,n),l(this,u,e)}async getLogin({email:t,password:n}){if(i(this,s).showSubmitLoadingButton(),!navigator.onLine){i(this,s).loginFailed("Anda hanya bisa login saat online.");return}try{const e=await i(this,r).getLogin({email:t,password:n});if(!e.ok){console.error("getLogin: response:",e),i(this,s).loginFailed(e.message);return}i(this,u).putAccessToken(e.loginResult.token),i(this,s).loginSuccessfully(e.message)}catch(e){console.error("getLogin: error:",e),i(this,s).loginFailed(e.message)}finally{i(this,s).hideSubmitLoadingButton()}}}s=new WeakMap,r=new WeakMap,u=new WeakMap;var d,c,h;class L{constructor(){a(this,c);a(this,d,null)}async render(){return`
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
    `}async afterRender(){l(this,d,new y({view:this,model:f,authModel:b})),p(this,c,h).call(this)}loginSuccessfully(t){alert(t),console.log(t),location.hash="/"}loginFailed(t){alert(t),console.log(t)}showSubmitLoadingButton(){document.getElementById("submit-button-container").innerHTML=`
      <button class="btn" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Masuk
      </button>
    `}hideSubmitLoadingButton(){document.getElementById("submit-button-container").innerHTML=`
      <button class="btn" type="submit">Masuk</button>
    `}}d=new WeakMap,c=new WeakSet,h=function(){document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const n={email:document.getElementById("email-input").value,password:document.getElementById("password-input").value};await i(this,d).getLogin(n)})};export{L as default};
