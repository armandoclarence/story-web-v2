var g=o=>{throw TypeError(o)};var m=(o,t,e)=>t.has(o)||g("Cannot "+e);var i=(o,t,e)=>(m(o,t,"read from private field"),e?e.call(o):t.get(o)),a=(o,t,e)=>t.has(o)?g("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(o):t.set(o,e),l=(o,t,e,n)=>(m(o,t,"write to private field"),n?n.call(o,e):t.set(o,e),e),p=(o,t,e)=>(m(o,t,"access private method"),e);import{A as h,S as f}from"./index.js";var s,r,u;class y{constructor({view:t,model:e,authModel:n}){a(this,s);a(this,r);a(this,u);l(this,s,t),l(this,r,e),l(this,u,n)}async getLogin({email:t,password:e}){i(this,s).showSubmitLoadingButton();try{const n=await i(this,r).getLogin({email:t,password:e});if(!n.ok){console.error("getLogin: response:",n),i(this,s).loginFailed(n.message);return}i(this,u).putAccessToken(n.loginResult.token),i(this,s).loginSuccessfully(n.message)}catch(n){console.error("getLogin: error:",n),i(this,s).loginFailed(n.message)}finally{i(this,s).hideSubmitLoadingButton()}}}s=new WeakMap,r=new WeakMap,u=new WeakMap;var c,d,b;class L{constructor(){a(this,d);a(this,c,null)}async render(){return`
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
    `}async afterRender(){l(this,c,new y({view:this,model:f,authModel:h})),p(this,d,b).call(this)}loginSuccessfully(t){alert(t),console.log(t),location.hash="/"}loginFailed(t){alert(t),console.log(t)}showSubmitLoadingButton(){document.getElementById("submit-button-container").innerHTML=`
      <button class="btn" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Masuk
      </button>
    `}hideSubmitLoadingButton(){document.getElementById("submit-button-container").innerHTML=`
      <button class="btn" type="submit">Masuk</button>
    `}}c=new WeakMap,d=new WeakSet,b=function(){document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const e={email:document.getElementById("email-input").value,password:document.getElementById("password-input").value};await i(this,c).getLogin(e)})};export{L as default};
