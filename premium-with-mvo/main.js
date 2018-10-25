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
let cats = [
    {name: 'Mustache', count: 0, imgUrl: 'https://image.shutterstock.com/image-photo/cute-cat-lying-on-his-260nw-572338033.jpg', imgAlt: 'Cat staring at camera on its back'}, 
    {name: 'Presto', count: 0, imgUrl: 'https://cdn.pixabay.com/photo/2018/03/27/17/25/cat-3266673__340.jpg', imgAlt: 'Orange cat looking off in the distance'}, 
    {name: 'Garfield', count: 0, imgUrl: 'https://www.sonomamag.com/wp-content/uploads/2018/05/shutterstock_352176329.jpg', imgAlt: 'Black and white striped cat looking all purrrdy'}, 
    {name: 'Larry', count: 0, imgUrl: 'http://www.catbreedslist.com/cat-wallpapers/Kitten-cute-lying-claws-900x506.jpg', imgAlt: "Cat pawing its face - maybe it's asking you for a scratch!"}, 
    {name: 'Bobby', count: 0, imgUrl: 'https://stylearena.net/wp-content/uploads/2015/04/cute-cat-in-jeans.jpg', imgAlt: 'Cat hiding in the pant leg of a pair of jeans'}
];

// View
// Loop through every cat within cats
function initCats(cats) {
    cats.forEach(function(cat, index) {
        // Print the cat's name in the first column
        let catName = cat.name;
        let elem = document.createElement('div')
        elem.textContent = catName;
        
        // Listen to which cat name was clicked
        elem.addEventListener('click', (e) => {
            cats[index].count++;
            // Display picture of cat underneath
            $('img').attr('src', cats[index].imgUrl);
            $('img').attr('alt', cats[index].imgAlt);
            $('#display-cat-name').text(cats[index].name);
            $('#cat-count').text(`Clicks: ${cats[index].count}`);
        })

        document.body.querySelector('#cat-name-list').appendChild(elem).classList.add('cat-name-list');
    })
}

// Octopus
initCats(cats)