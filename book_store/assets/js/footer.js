var footer = document.querySelector('#footer')
var homec = document.querySelector('#homepage')
var date = new Date()
var annee= date.getFullYear();
var contenu= "BALDE ALSENY    COPYRIGHT  &copy "+annee ;
footer.innerHTML=contenu;
homec.innerHTML=contenu;

