const inputBox = document.getElementById('answer-input-box');
const submitted = document.getElementById('answer-submitted');
const question = document.getElementById('question');
const info = document.getElementById('answer-info');
var correctAnswer = null;
var qnum = -1;
var maxQuestions = 100;
var score = 0;

// Hard coded data. Very ugly, but at least it works
var data = ["Grande Arche de La Defense;1",
"Esplanade de La Defense;1",
"Pont de Neuilly;1",
"Les Sablons;1",
"Porte Maillot;1",
"Argentine;1",
"Charles de Gaulle - Etoile;1-2-6",
"George V;1",
"Franklin-D. Roosevelt;1-9",
"Champs Elysees - Clemenceau;1-13",
"Concorde;1-12-8",
"Tuileries;1",
"Palais Royal - Musee du Louvre;1-7",
"Louvre - Rivoli;1",
"Chatelet;1-11-14-4-7",
"Hotel de Ville;1-11",
"Saint-Paul;1",
"Bastille;1-5-8",
"Gare de Lyon;1-14",
"Reuilly - Diderot;1-8",
"Nation;1-2-6-9",
"Porte de Vincennes;1",
"Saint-Mande - Tourelle;1",
"Berault;1",
"Chateau de Vincennes;1",
"Porte Dauphine;2",
"Victor Hugo;2",
"Ternes;2",
"Courcelles;2",
"Monceau;2",
"Villiers;2-3",
"Rome;2",
"Place de Clichy;13-2",
"Blanche;2",
"Pigalle;12-2",
"Anvers;2",
"Barbes - Rochechouart;2-4",
"La Chapelle;2",
"Stalingrad;2-5-7",
"Jaures;2-5-7b",
"Colonel Fabien;2",
"Belleville;11-2",
"Couronnes;2",
"Menilmontant;2",
"Pere Lachaise;2-3",
"Philippe Auguste;2",
"Alexandre Dumas;2",
"Avron;2",
"Pont de Levallois - Becon;3",
"Anatole France;3",
"Louise Michel;3",
"Porte de Champerret;3",
"Pereire;3",
"Wagram;3",
"Malesherbes;3",
"Europe;3",
"Saint-Lazare;12-13-14-3",
"Havre - Caumartin;3-9",
"Opera;3-7-8",
"Quatre Septembre;3",
"Bourse;3",
"Sentier;3",
"Reaumur - Sebastopol;3-4",
"Arts et Metiers;11-3",
"Temple;3",
"Republique;11-3-5-8-9",
"Parmentier;3",
"Rue Saint-Maur;3",
"Gambetta;3-3b",
"Porte de Bagnolet;3",
"Gallieni;3",
"Pelleport;3b",
"Saint-Fargeau;3b",
"Porte des Lilas;11-3b",
"Porte de Clignancourt;4",
"Simplon;4",
"Marcadet - Poissonniers;12-4",
"Chateau Rouge;4",
"Gare du Nord;4-5",
"Gare de l'Est;4-5-7",
"Chateau d'Eau;4",
"Strasbourg - Saint-Denis;4-8-9",
"Etienne Marcel;4",
"Les Halles;4",
"Cite;4",
"Saint-Michel;4",
"Odeon;10-4",
"Saint-Germain des Pres;4",
"Saint-Sulpice;4",
"Saint-Placide;4",
"Montparnasse - Bienvenue;12-13-4-6",
"Vavin;4",
"Raspail;4-6",
"Denfert Rochereau;4-6",
"Mouton Duvernet;4",
"Alesia;4",
"Porte d'Orleans;4",
"Mairie de Montrouge;4",
"Barbara;4",
"Bagneux Lucie Aubrac;4",
"Bobigny - Pablo Picasso;5",
"Bobigny - Pantin - Raymond Queneau;5",
"Eglise de Pantin;5",
"Hoche;5",
"Porte de Pantin;5",
"Ourcq;5",
"Laumiere;5",
"Jacques Bonsergent;5",
"Oberkampf;5-9",
"Richard Lenoir;5",
"Breguet - Sabin;5",
"Quai de la Rapee;5",
"Gare d'Austerlitz;10-5",
"Saint-Marcel;5",
"Campo Formio;5",
"Place d'Italie;5-6-7",
"Kleber;6",
"Boissiere;6",
"Trocadero;6-9",
"Passy;6",
"Bir Hakeim;6",
"Dupleix;6",
"La Motte-Picquet - Grenelle;10-6-8",
"Cambronne;6",
"Sevres - Lecourbe;6",
"Pasteur;12-6",
"Edgar Quinet;6",
"Saint-Jacques;6",
"Glaciere;6",
"Corvisart;6",
"Nationale;6",
"Chevaleret;6",
"Quai de la Gare;6",
"Bercy;14-6",
"Dugommier;6",
"Daumesnil;6-8",
"Bel Air;6",
"Picpus;6",
"La Courneuve - 8 Mai 1945;7",
"Fort d'Aubervilliers;7",
"Aubervilliers - Pantin Quatre Chemins;7",
"Porte de la Villette;7",
"Corentin Cariou;7",
"Crimee;7",
"Riquet;7",
"Louis Blanc;7-7b",
"Chateau Landon;7",
"Poissonniere;7",
"Cadet;7",
"Le Peletier;7",
"Chaussee d'Antin - La Fayette;7-9",
"Pyramides;14-7",
"Pont Neuf;7",
"Pont Marie;7",
"Sully - Morland;7",
"Jussieu;10-7",
"Place Monge;7",
"Censier - Daubenton;7",
"Les Gobelins;7",
"Tolbiac;7",
"Maison Blanche;7",
"Porte d'Italie;7",
"Porte de Choisy;7",
"Porte d'Ivry;7",
"Pierre et Marie Curie;7",
"Mairie d'Ivry;7",
"Le Kremlin Bicetre;7",
"Villejuif - Leo Lagrange;7",
"Villejuif - Paul Vaillant-Couturier;7",
"Villejuif - Louis Aragon;7",
"Pre-Saint-Gervais;7b",
"Danube;7b",
"Botzaris;7b",
"Buttes Chaumont;7b",
"Bolivar;7b",
"Place des Fetes;11-7b",
"Balard;8",
"Lourmel;8",
"Boucicaut;8",
"Felix Faure;8",
"Commerce;8",
"Ecole Militaire;8",
"La Tour Maubourg;8",
"Invalides;13-8",
"Madeleine;12-14-8",
"Richelieu - Drouot;8-9",
"Grands Boulevards;8-9",
"Bonne Nouvelle;8-9",
"Filles du Calvaire;8",
"Saint-Sebastien - Froissart;8",
"Chemin Vert;8",
"Ledru Rollin;8",
"Faidherbe - Chaligny;8",
"Montgallet;8",
"Michel Bizot;8",
"Porte Doree;8",
"Porte de Charenton;8",
"Liberte;8",
"Charenton - Ecoles;8",
"Ecole Veterinaire de Maisons-Alfort;8",
"Maisons-Alfort - Stade;8",
"Maisons-Alfort - Les Juilliottes;8",
"Creteil - L'Echat;8",
"Creteil - Universite;8",
"Creteil - Prefecture;8",
"Creteil - Pointe du Lac;8",
"Pont de Sevres;9",
"Billancourt;9",
"Marcel Sembat;9",
"Porte de Saint-Cloud;9",
"Exelmans;9",
"Michel-Ange - Molitor;10-9",
"Michel-Ange - Auteuil;10-9",
"Jasmin;9",
"Ranelagh;9",
"La Muette;9",
"Rue de la Pompe;9",
"Iena;9",
"Alma - Marceau;9",
"Saint-Philippe du Roule;9",
"Miromesnil;13-9",
"Saint-Augustin;9",
"Saint-Ambroise;9",
"Voltaire;9",
"Charonne;9",
"Rue des Boulets;9",
"Buzenval;9",
"Maraichers;9",
"Porte de Montreuil;9",
"Robespierre;9",
"Croix de Chavaux;9",
"Mairie de Montreuil;9",
"Boulogne - Pont de Saint-Cloud;10",
"Boulogne - Jean Jaures;10",
"Chardon - Lagache;10",
"Mirabeau;10",
"Javel;10",
"Charles Michels;10",
"Avenue Emile Zola;10",
"Segur;10",
"Duroc;10-13",
"Vaneau;10",
"Sevres - Babylone;10-12",
"Mabillon;10",
"Cluny - La Sorbonne;10",
"Maubert - Mutualite;10",
"Cardinal Lemoine;10",
"Eglise d'Auteuil;10",
"Porte d'Auteuil;10",
"Mairie des Lilas;11",
"Telegraphe;11",
"Jourdain;11",
"Pyrenees;11",
"Goncourt;11",
"Rambuteau;11",
"Mairie d'Aubervilliers;12",
"Aime Cesaire;12",
"Front Populaire;12",
"Porte de la Chapelle;12",
"Marx Dormoy;12",
"Jules Joffrin;12",
"Lamarck - Caulaincourt;12",
"Abbesses;12",
"Saint-Georges;12",
"Notre-Dame de Lorette;12",
"Trinite - d'Estienne d'Orves;12",
"Assemblee Nationale;12",
"Solferino;12",
"Rue du Bac;12",
"Rennes;12",
"Notre-Dame des Champs;12",
"Falguiere;12",
"Volontaires;12",
"Vaugirard;12",
"Convention;12",
"Porte de Versailles;12",
"Corentin Celton;12",
"Mairie d'Issy;12",
"Saint-Denis - Universite;13",
"Basilique de Saint-Denis;13",
"Saint-Denis - Porte de Paris;13",
"Carrefour Pleyel;13",
"Mairie de Saint-Ouen;13-14",
"Garibaldi;13",
"Porte de Saint-Ouen;13",
"Guy Moquet;13",
"La Fourche;13",
"Liege;13",
"Varenne;13",
"Saint-Francois-Xavier;13",
"Gaite;13",
"Pernety;13",
"Plaisance;13",
"Porte de Vanves;13",
"Malakoff - Plateau de Vanves;13",
"Malakoff - Rue Etienne Dolet;13",
"Chatillon - Montrouge;13",
"Asnieres Gennevilliers - Les Courtilles;13",
"Les Agnettes;13",
"Gabriel Peri;13",
"Mairie de Clichy;13",
"Porte de Clichy;13-14",
"Brochant;13",
"Saint-Ouen;14",
"Pont Cardinet;14",
"Cour Saint-Emilion;14",
"Bibliotheque Francois-Mitterand;14",
"Olympiades;14" ];


// Shuffle
data = data.sort((a, b) => 0.5 - Math.random())

// What will happen when the game advances one step

const compareArrays = (answer, correct) => {
    var points=0;
    for (let i = 0; i < answer.length; i++) {
        if (correct.includes(answer[i])){
            points ++;
        }
        else{
            points --;
        }
      }
    points = Math.round(points / correct.length * 100) / 100;
    return Math.max(points, 0);
};

function compareAnswer(answer, correct){
    // Turn them both in arrays using their delimiters
    // Answer must be delimited by commas
    return compareArrays(
        answer.trim().split(",").map(x => x.trim()).sort(), 
        correct.trim().split("-").map(x => x.trim()).sort()
        )
}


function consumeQuestion(data){
    qnum ++;
    let qa = data[qnum];
    question.innerText = qa.split(";")[0];
    correctAnswer = qa.split(";")[1];
};

function updateScore(msg, points, score){
    submitted.innerText = `${msg} +${points} (Score: ${score} / ${qnum+1})`;
}


inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        var ans = inputBox.value;
        var msg = "";
        var points = compareAnswer(ans, correctAnswer); 
        // console.log("points ", points)
        // Check if answer was good or not
        if(points == 1){
            msg = "Correct !";
            submitted.style.background = '#61e885';
            info.innerText = "";
        }
        else{
            info.innerText = `Correct answer was: ${correctAnswer.replaceAll("-", ", ")}`;
            if (points == 0){
                // Red
                msg = "Wrong !";
                submitted.style.background = '#ff4a4a';
            }
            else{
                // Yellow
                msg = "Almost !";
                submitted.style.background = '#ffcc02';
            }

        };
        score = score + points;
        
        updateScore(msg, points, score);
        
        // Ready up for next question
        inputBox.value = "";
        consumeQuestion(data)

        // // Save progress
        // localStorage.setItem(username+"_score", score);
        // localStorage.setItem(username+"_qnum", qnum);
    }
});


// Viewport change in phone

function resize_viewport(){
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    // document.getElementById("body").css({"width":w,"height":h});
    document.body.style.height = h + "px";
    document.body.style.width = w + "px";
    console.log(`resize: ${w}, ${h}`);
};

window.onresize = function (event){
    resize_viewport();
}

// window.onload = function (event) {
//     // Focus on the input box so that the keyboard gets displayed
//     $('answer-input-box').focus();
//     $('answer-input-box').select();

// }


// Start of the game

// Save progress
// let username = window.prompt("Enter your username: ", "user");
// if(localStorage.getItem(username) === null){
//     console.log("Cretaing new username: ", username)
//     localStorage.setItem(username, 'exists');
//     localStorage.setItem(username+"_data", JSON.stringify(data));
// }
// else{
//     var continue_user = window.confirm("This username has been found. Do you want to continue with the previous game ?")
//     if (continue_user){
//         qnum = Number(localStorage.getItem(username+"_qnum"));
//         data = JSON.parse(localStorage.getItem(username+"_data"));
//         score = Number(localStorage.getItem(username+"_score"));
//         submitted.innerText = `(Score: ${score} / ${qnum})`
        
//         console.log(`Read data: score=${score} qnum=${qnum}, lastQ=${data[qnum-1]}, nextQ=${data[qnum]}`);
//         qnum--; // before consume question
        
//     }
//     else{
        
//     }
// }

consumeQuestion(data);

