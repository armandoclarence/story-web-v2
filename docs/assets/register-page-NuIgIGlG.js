var g=t=>{throw TypeError(t)};var c=(t,e,s)=>e.has(t)||g("Cannot "+s);var i=(t,e,s)=>(c(t,e,"read from private field"),s?s.call(t):e.get(t)),n=(t,e,s)=>e.has(t)?g("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,s),u=(t,e,s,d)=>(c(t,e,"write to private field"),d?d.call(t,s):e.set(t,s),s),p=(t,e,s)=>(c(t,e,"access private method"),s);import{S as b}from"./index-op2RrKEP.js";var a,o;class h{constructor({view:e,model:s}){n(this,a);n(this,o);u(this,a,e),u(this,o,s)}async getRegistered({name:e,email:s,password:d}){i(this,a).showSubmitLoadingButton();try{const r=await i(this,o).getRegistered({name:e,email:s,password:d});if(!r.ok){console.error("getRegistered: response:",r),i(this,a).registeredFailed(r.message);return}i(this,a).registeredSuccessfully(r.message,r.data)}catch(r){console.error("getRegistered: error:",r),i(this,a).registeredFailed(r.message)}finally{i(this,a).hideSubmitLoadingButton()}}}a=new WeakMap,o=new WeakMap;var l,m,f;class _{constructor(){n(this,m);n(this,l,null)}async render(){return`
      <section class="register-container">
        <div class="register-form-container">
          <h1 class="register__title">Daftar akun</h1>

          <form id="register-form" class="register-form">
            <div class="form-control">
              <label for="name-input" class="register-form__name-title">Nama lengkap</label>

              <div class="register-form__title-container">
                <input id="name-input" type="text" name="name" placeholder="Masukkan nama lengkap Anda">
              </div>
            </div>
            <div class="form-control">
              <label for="email-input" class="register-form__email-title">Email</label>

              <div class="register-form__title-container">
                <input id="email-input" type="email" name="email" placeholder="Contoh: nama@email.com">
              </div>
            </div>
            <div class="form-control">
              <label for="password-input" class="register-form__password-title">Password</label>

              <div class="register-form__title-container">
                <input id="password-input" type="password" name="password" placeholder="Masukkan password baru">
              </div>
            </div>
            <div class="form-buttons register-form__form-buttons">
              <div id="submit-button-container">
                <button class="btn" type="submit">Daftar akun</button>
              </div>
              <p class="register-form__already-have-account">Sudah punya akun? <a href="#/login">Masuk</a></p>
            </div>
          </form>
        </div>
      </section>
    `}async afterRender(){u(this,l,new h({view:this,model:b})),p(this,m,f).call(this)}registeredSuccessfully(e){alert(e),console.log(e),location.hash="/login"}registeredFailed(e){alert(e),console.log(e)}showSubmitLoadingButton(){document.getElementById("submit-button-container").innerHTML=`
      <button class="btn" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Daftar akun
      </button>
    `}hideSubmitLoadingButton(){document.getElementById("submit-button-container").innerHTML=`
      <button class="btn" type="submit">Daftar akun</button>
    `}}l=new WeakMap,m=new WeakSet,f=function(){document.getElementById("register-form").addEventListener("submit",async e=>{e.preventDefault();const s={name:document.getElementById("name-input").value,email:document.getElementById("email-input").value,password:document.getElementById("password-input").value};await i(this,l).getRegistered(s)})};export{_ as default};
