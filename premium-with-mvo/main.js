// Preload images
var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

//-- usage --//
preload(
    "https://image.shutterstock.com/image-photo/cute-cat-lying-on-his-260nw-572338033.jpg",
    "https://cdn.pixabay.com/photo/2018/03/27/17/25/cat-3266673__340.jpg",
    "https://www.sonomamag.com/wp-content/uploads/2018/05/shutterstock_352176329.jpg",
    "http://www.catbreedslist.com/cat-wallpapers/Kitten-cute-lying-claws-900x506.jpg",
    "https://stylearena.net/wp-content/uploads/2015/04/cute-cat-in-jeans.jpg"
)

// Change everything into array of objects
// Model is the array of objects named cats
let model = {

    currentCat: null,
    cats: [
        {
            name: 'Mustache', 
            count: 0, 
            imgUrl: 'https://image.shutterstock.com/image-photo/cute-cat-lying-on-his-260nw-572338033.jpg', 
            imgAlt: 'Cat staring at camera on its back'
        }, 
        {
            name: 'Presto', 
            count: 0, 
            imgUrl: 'https://cdn.pixabay.com/photo/2018/03/27/17/25/cat-3266673__340.jpg', 
            imgAlt: 'Orange cat looking off in the distance'
        }, 
        {
            name: 'Garfield', 
            count: 0, 
            imgUrl: 'https://www.sonomamag.com/wp-content/uploads/2018/05/shutterstock_352176329.jpg', 
            imgAlt: 'Black and white striped cat looking all purrrdy'
        }, 
        {
            name: 'Larry', 
            count: 0, 
            imgUrl: 'http://www.catbreedslist.com/cat-wallpapers/Kitten-cute-lying-claws-900x506.jpg', 
            imgAlt: "Cat pawing its face - maybe it's asking you for a scratch!"
        }, 
        {
            name: 'Bobby', 
            count: 0, 
            imgUrl: 'https://stylearena.net/wp-content/uploads/2015/04/cute-cat-in-jeans.jpg', 
            imgAlt: 'Cat hiding in the pant leg of a pair of jeans'
        }
    ]
};

// Octopus

let octopus = {

    init: function() {
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
        catView.hideAdmin();
        catView.listenForm();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },
    
    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.count++;
        catView.render();
    },

    changeCat: function(oldName, newCat) {
        for (let i = 0; i < model.cats.length; i++) {
            if (model.cats[i].name === oldName) {
                model.cats[i] = newCat;
                catView.render();
            }
        }
    }
};

let catView = {

    init: function() {
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');
        this.admin =  document.querySelector('#admin');
        this.display = document.querySelector('#cat-img');    

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function() {
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    listenForm: function() {
        document
            .querySelector('#form')
            .addEventListener('submit', this.onSubmit);
    },

    nameChange: function(name) {
        this.catNameElem = name;
    },

    imageChange: function(source) {
        this.catImageElem = source;
    },

    clicksChange: function(clicks) {
        this.countElem = clicks;
    },

    onSubmit: function(e) {
        e.preventDefault();
        const newCat = {
            name: catView.catNameElem,
            image: catView.catImageElem,
            clicks: catView.countElem
        };
        const oldName = octopus.getCurrentCat().name;
        octopus.changeCat(oldName, newCat);
        catView.render();
        catListView.render();
        catView.clearForm();
    },

    clearForm: function() {
        this.catNameElem = '';
        this.catImageElem = '';
        this.countElem = 0;
    },

    showAdmin: function() {
        this.admin.style.display = 'block';
    },

    hideAdmin: function() {
        this.admin.style.display = 'none';
    },

    render: function() {
        let currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.count;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgUrl;
        this.catImageElem.alt = currentCat.imgAlt;
    }
};

let catListView =  {
     
    init: function() {
        this.catListElem = document.getElementById('cat-list');

        this.render();
    },

    render: function() {
        var cats = octopus.getCats();
        this.catListElem.innerHTML = '';
        for (let i = 0; i < cats.length; i++) {
            var cat = cats[i];
            var elem = document.createElement('li');
            elem.textContent = cat.name;
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            this.catListElem.appendChild(elem);
        };
    }
};

octopus.init();