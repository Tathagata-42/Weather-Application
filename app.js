window.addEventListener('load', ()=> {

    let long;
    let lat;

    let temparatureDescription = document.querySelector('.temparature-description');
    let temparatureDegree=document.querySelector('.temparature-degree');

    let locationTimeZone = document.querySelector('.location-timezone');

    let temparatureSection=document.querySelector('.temparature')
    const temparatureSpan = document.querySelector('.temparature span')



    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(position =>{

            long = position.coords.longitude;
            lat=position.coords.latitude;

            const proxy='https://cors-anywhere.herokuapp.com/'

            const api =  `${proxy}https://api.darksky.net/forecast/0bffc83367a4ad8f57111100f1bda450/${lat},${long}`;


            
        fetch(api)
        .then(response => {
            return response.json()

        })
        .then(data =>{
            console.log(data);
            const {temperature,summary ,icon} = data.currently;

            //set DOM Elements from the api

            temparatureDegree.textContent=temperature;
            temparatureDescription.textContent=summary;
            locationTimeZone.textContent=data.timezone;


            //formula

            let celsius = (temperature - 32)*(5/9);


           //set icon

           setIcons(icon,document.querySelector(".icon"))

           //set celsius from fara

           temparatureSection.addEventListener('click',() =>{
               if(temparatureSpan.textContent === 'F'){
                   temparatureSpan.textContent ="C"
                   temparatureDegree.textContent=Math.floor(celsius);

               } else {

                temparatureSpan.textContent="F"
                temparatureDegree.textContent = temperature;

               }
           })






        });



            })




    } 


    function setIcons(icon,iconID){

        const skycons = new Skycons({color : 'white'})

        const currentIcon = icon.replace(/-/g,"_").toUpperCase()
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon])



    }
    

});