<script>

import { page } from '$app/stores';

export let data; 

    let alla_kartor = [
        {
            src: '/uploads/Uppsala möte, lång, H18, Isak Bengtsson.png',
            tävling: 'Uppsala Möte Lång H18  rh',
            tävlings_distans: 'lång',
            date:new Date('2026,3,26'),
        },
        {
            src: '/uploads/Kolmårdskavlan.png',
            tävling: 'Kolmårdskavlen (Stafettligan, #1), H17E',
            tävlings_distans: 'staffet',
            date:new Date('2026,3,6'),
        },
        {
            src: '/uploads/Kolmårdsmedeln.png',
            tävling: 'Swedish Leauge #2 ',
            tävlings_distans: 'medel',
            date: new Date('2026,3,5'),
        },
        {
            src: '/uploads/10mila 2026.png',
            tävling: '10Mila 2026 Str 8',
            tävlings_distans: 'staffet',
            date:new Date('2026, 4, 3'),
        },
        {
            src: '/uploads/Umeå OK_s distriktstävling, H21, Isak Bengtsson.png',
            tävling: 'UOK Distriktstävling',
            tävlings_distans: 'medel',
            date:new Date('2026, 4, 9'),
        },
        {
            src: '/uploads/Uppsala möte, medel, H18, Isak Bengtsson.png',
            tävling: 'Uppsala möte Medel',
            tävlings_distans: 'medel',
            date:new Date('2026, 3,25'),
        },
        {
            src: '/uploads/Uppsala möte, natt, H18, Isak Bengtsson.png',
            tävling: 'Uppsala möte natt',
            tävlings_distans: 'lång',
            date:new Date('2026, 3,24'),
        },
        {
            src: '/uploads/SkidO, JSM_2026_sprint.png',
            tävling: 'SkidO JSM Sprint',
            tävlings_distans: 'sprint',
            date:new Date('2026, 2,22'),
        },{
            src: '/uploads/lång, H18 Elit, Isak Bengtsson.png',
            tävling: 'Skido JSM Lång',
            tävlings_distans: 'lång',
            date:new Date('2026, 2,21'),
        },{
            src: '/uploads/SkidO, Svenska cupen, 1, sprint + publiktävling, H 18 E, Isak Bengtsson.png',
            tävling: 'Svenskacupen 1 Sprint',
            tävlings_distans: 'sprint',
            date:new Date('2025,10,29'),
        },{
            src: '/uploads/SkidO, Svenska cupen, 2, medel + publiktävling, H 18 E, Isak Bengtsson (1).png',
            tävling: 'Svenskacupen 2 Medel',
            tävlings_distans: 'medel',
            date:new Date('2025,10,30'),
        },{
            src: '/uploads/25manna, 25manna, Isak Bengtsson.png',
            tävling: '25manna str4',
            tävlings_distans: 'staffet',
            date:new Date('2025,09,11'),
        },{
            src: '/uploads/Rallarsvängen, H18, Isak Bengtsson.png',
            tävling: 'Rallarsvängen',
            tävlings_distans: 'medel',
            date:new Date('2025,09,5'),
        },{
            src: '/uploads/Träning Dalsjö, Kontrolltagning, Isak Bengtsson.png',
            tävling: 'Ueg träning',
            tävlings_distans: 'träning',
            date:new Date('2026,4,13'),
        },{
            src: '/uploads/Träningspaket 10Mila 2026-Helgaklint - Gafflade banor, Gaffel 9K, Isak Bengtsson.png',
            tävling: '10mila Träning',
            tävlings_distans: 'träning',
            date:new Date('2026,3,8'),
        },
    ];

let alla_kartor_v2 = [
    ...alla_kartor,
    ...data.kartor.map(k => ({
        ...k,
        date: new Date(k.date) 
    }))
];

    let kartor = [...alla_kartor_v2]
    kartor.sort((a, b) => b.date - a.date);

let formulär_öppen = false

function openForm() {
    formulär_öppen = true;
    console.log("openForm körs", formulär_öppen);
}

function closeForm() {
    formulär_öppen = false;
}

function ändra_år_0(x) {
    kartor = [...alla_kartor_v2]
    kartor.sort((a, b) => b.date - a.date);
    vilket_år = 1999
}
let vilket_år = 1999;

function ändra_år(x) {
    if (x === 1999){
        kartor = [...alla_kartor_v2]
        kartor.sort((a, b) => b.date - a.date);
        vilket_år = 1999
        return
    } else{
        kartor = [...alla_kartor_v2]
        kartor = kartor.filter(a => a.date.getFullYear() === x);
        kartor.sort((a, b) => b.date - a.date);
        vilket_år = x
    }
    
}

function ändra_distans(x) {
    if (vilket_år === 1999){
        kartor = [...alla_kartor_v2]
        kartor = kartor.filter(a => a.tävlings_distans === x);
        kartor.sort((a, b) => b.date - a.date);
        return
    }else{
        kartor = [...alla_kartor_v2]
        kartor = kartor.filter(a => a.date.getFullYear() === vilket_år);
        kartor = kartor.filter(a => a.tävlings_distans === x);
        kartor.sort((a, b) => b.date - a.date);
    }
    
}

function ändra_distans_alla(x) {
    if(vilket_år === 1999){
        kartor = [...alla_kartor_v2]
        kartor.sort((a, b) => b.date - a.date);
        return
    }else{
        kartor = [...alla_kartor_v2]
        kartor = kartor.filter(a => a.date.getFullYear() === vilket_år);
    }
    
}

async function handleSubmit(event) {
    const formData = new FormData(event.target);
    const tävling = formData.get('tävling_namn');
    const datum = formData.get('kart_datum');
    const distans = formData.get('tävling_distans');

    const res = await fetch('?/default', {
        method: 'POST',
        body: formData
    });

    const text = await res.text();
    const json = JSON.parse(text.replace(/^\d+/, ''));
    const data = json.data ?? json;

    alla_kartor = [
        ...alla_kartor,
        {
            src: '/uploads/' + data.item.imageUrl,
            tävling: tävling,
            tävlings_distans: distans,
            date: new Date(datum)
        }
    ];

    kartor = [...alla_kartor];
    formulär_öppen = false;
    event.target.reset();
}
</script>

<div class=main>
<title>Isaks digitala kartarkiv</title>

<h1>Isaks digtitala kartarkiv</h1>

<button class="knapp_öppna_meny" onclick={openForm}>Lägg till karta</button>
{#if formulär_öppen}
<div class="formulär">
    <form method="post" onsubmit={handleSubmit}  enctype="multipart/form-data"  class="formulär-container">
        <h2>Lägg till karta</h2>

        <label for="kart_fil"><b>Kartfil</b></label>
        <input type="file" placeholder="Ange Kartnamn" name="image"  required>

        <label for="tävling_namn"><b>Tävlings namn</b></label>
        <input type="text" placeholder="Max 25 karaktärer" name="tävling_namn" maxlength="25"  required>

        <label for="tävling_distans"><b>Vilken Distans?</b></label>
        <select name="tävling_distans" required>
            <option value="">-- Välj distans --</option>
            <option value="lång">Lång</option>
            <option value="medel">Medel</option>
            <option value="sprint">Sprint</option>
            <option value="staffet">Staffet</option>
            <option value="träning">Träning</option>
        </select>

        <label for="datum_tävling"><b>Vilket Datum?</b></label>
        <input type="date" placeholder="Ange Datum" name="kart_datum"  required>

        <button type="submit" class="knapp_lägg_till" >Lägg till</button>
        <button type="button" class="knapp_stäng_meny" onclick={closeForm}>Stäng</button>
    </form>
</div>
{/if}
<div class='huvud_meny'>
<div><button class='år_väljare' onclick={()=> ändra_år_0()}>
Alla
</button></div>
<div><button class='år_väljare' onclick={()=>ändra_år(2026)}>
2026
</button></div>
<div>
<button class='år_väljare' onclick={ändra_år(2025)}>
2025
</button>
</div>
<div>
<button class='år_väljare' onclick={ändra_år(2024)}>
2024
</button>
</div>
<div>
<button class='år_väljare' onclick={ändra_år(2023)}>
2023
</button>
</div>
<div>
<button class='år_väljare' onclick={ändra_år(2022)}>
2022
</button>
</div>
<div>
<button class='år_väljare' onclick={ändra_år(2021)}>
2021
</button>
</div>
<div>
<button class='år_väljare' onclick={ändra_år(2020)}>
2020
</button>
</div>
<div>
<button class='år_väljare' onclick={ändra_år(2019)}>
2019
</button>
</div>
<div>
<button class='år_väljare' onclick={ändra_distans_alla()}>
Alla
</button>
</div>
<div>
<button class='år_väljare' onclick={()=>ändra_distans('lång')}>
Lång
</button>
</div>
<div>
<button class='år_väljare' onclick={ändra_distans('medel')}>
Medel
</button>
</div>
<div>
<button class='år_väljare' onclick={ändra_distans('sprint')}>
Sprint
</button>
</div>
<div>
<button class='år_väljare' onclick={ändra_distans('staffet')}>
Staffet
</button>
</div>
<div>
<button class='år_väljare' onclick={ändra_distans('träning')}>
Träning
</button>
</div>

</div>

<div class="kart_samlare">
    {#each kartor as karta}
        <div class="bild">
            <div class='kart_namn'>{karta.namn}</div>
            <div class='kart_namn'>{karta.tävling}</div>
            <a href={karta.src} target="_blank" rel="noreferrer"><img src={karta.src} alt={karta.namn} onclick={öppna_bild(karta.src)}/> </a>
            
        </div>
    {/each}
    
</div>

</div>
<style>
    .main{
        background-image: url(https://www.ol.kfumorebro.se/ol/images/news/Fr%C3%B6torp.PNG);
        width: 98vw;
        position: absolute;
        
    }
    h1{
        position: absolute;
        font-family:cursive;
        
    }
    
    .kart_samlare{
        display:grid;
        grid-template-columns: 20% 20% 20% 20% 20%;
        grid-template-rows: 225px;
        grid-gap:1em;
        width: 80vw;
        height:75vh;
        background-color:#555555bf;
        justify-self: flex-end;
        margin-bottom: 1vh;
        margin-top: 18vh;
        overflow: scroll;
        border-radius: 15px;
        padding-top: 15px; 

        @media screen and (min-width: 200px) {
            grid-template-columns: 225px;
        }
        @media screen and (min-width: 500px) {
            grid-template-columns: 225px 225px;
        }
        @media screen and (min-width: 800px) {
            grid-template-columns: 225px 225px 225px;
        }
        @media screen and (min-width: 1000px) {
            grid-template-columns: 200px 200px 200px 200px;
        }
        @media screen and (min-width: 1400px) {
            grid-template-columns: 225px 225px 225px 225px 225px;
        }
        
    }
    .kart_samlare::-webkit-scrollbar{
        display: none;
    }
    .huvud_meny{
        display: grid;
        grid-template-columns:33% 33% 33%;
        grid-template-rows:52px 52px 70px 52px;
        width: 15vw;
        height:40vh;
        margin-top: 18vh;
        position: fixed;
        border-radius: 15px;
        justify-content: center;
        @media screen and (max-width:800px) {
            grid-template-columns: 50% 50%;
            grid-template-rows:50px 50px 50px 50px 50px 50px 50px 50px ;
            
        }
    }


    .bild{
        justify-self: center;
    }

    img{
        max-width: 200px;
        max-height: 200px;
        width: auto;
        height: auto;
        border: none;
        overflow: hidden;
        justify-self: center;
        align-self: center;
        margin-top: 10px;
        margin-left: 15px;
        margin-right: 25px;
    }

    .kart_namn{
        display: flex;
        justify-self: center;
        color:#000000;
        font-size: larger;
        background-color: white;
        border-radius: 5px;
        padding-left: 5px;
    }

    .år_väljare{
        margin-top: 5px;
        margin-left: 1px;
        justify-self: center;
        background-color: #555;
        color: rgb(255, 255, 255);
        padding: 16px 20px;
        border: none;
        cursor: pointer;
        opacity: 0.8;
        position: absolute;
        border-radius: 12px;
        width: 4.8vw;
    }

    .år_väljare:hover{
        background-color: #ddd;
    outline: none;
    }

.knapp_öppna_meny {
    background-color: rgb(85, 85, 85);
    color: white;
    padding: 16px 20px;
    border: none;
    cursor: pointer;
    opacity: 0.8;
    position: absolute;
    top: 23px;
    right: 28px;
    width: 280px;
    border-radius: 12px;
}

.formulär{
    position: fixed;
    top: 0;
    right: 15px;
    border: 3px solid #f1f1f1;
    z-index: 9;
    border-radius: 15px;
}

.formulär-container {
    max-width: 300px;
    padding: 10px;
    background-color: white;
    border-radius: 12px;
}


.formulär-container input[type=text], .formulär-container input[type=file], .formulär-container input[type=date], .formulär-container select{
    width: 100%;
    padding: 15px;
    margin: 10px 0 20px;
    border: none;
    background: #f1f1f1;
    border-radius: 12px;
}


.formulär-container input[type=text]:focus, .formulär-container input[type=file], .formulär-container input[type=date], .formulär-container select:focus {
    background-color: #ddd;
    outline: none;
}


.formulär-container .knapp_lägg_till {
    background-color: #04AA6D;
    color: white;
    padding: 16px 20px;
    border: none;
    cursor: pointer;
    width: 100%;
    margin-bottom:10px;
    opacity: 0.8;
    border-radius: 12px;
}

.formulär-container .knapp_stäng_meny {
    background-color: red;
    color: white;
    padding: 16px 20px;
    border: none;
    cursor: pointer;
    width: 100%;
    margin-bottom:10px;
    opacity: 0.8;
    border-radius: 12px;
}

@media{

}

</style>