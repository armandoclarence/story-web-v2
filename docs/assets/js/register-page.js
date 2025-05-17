var l=t=>{throw TypeError(t)};var r=(t,e,a)=>e.has(t)||l("Cannot "+a);var m=(t,e,a)=>(r(t,e,"read from private field"),a?a.call(t):e.get(t)),s=(t,e,a)=>e.has(t)?l("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,a),d=(t,e,a,o)=>(r(t,e,"write to private field"),o?o.call(t,a):e.set(t,a),a),u=(t,e,a)=>(r(t,e,"access private method"),a);import p from"./register-presenter.js";import{S as f}from"./index.js";var n,i,c;class y{constructor(){s(this,i);s(this,n,null)}async render(){return`
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
    `}async afterRender(){d(this,n,new p({view:this,model:f})),u(this,i,c).call(this)}registeredSuccessfully(e){alert(e),console.log(e),location.hash="/login"}registeredFailed(e){alert(e),console.log(e)}showSubmitLoadingButton(){document.getElementById("submit-button-container")&&(document.getElementById("submit-button-container").innerHTML=`
      <button class="btn" type="submit" disabled>
          <i class="fas fa-spinner loader-button"></i> Daftar akun
        </button>
      `)}hideSubmitLoadingButton(){document.getElementById("submit-button-container")&&(document.getElementById("submit-button-container").innerHTML=`
        <button class="btn" type="submit">Daftar akun</button>
      `)}}n=new WeakMap,i=new WeakSet,c=function(){document.getElementById("register-form").addEventListener("submit",async e=>{e.preventDefault();const a={name:document.getElementById("name-input").value,email:document.getElementById("email-input").value,password:document.getElementById("password-input").value};await m(this,n).getRegistered(a)})};export{y as default};
