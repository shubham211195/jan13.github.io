const ACCESS_KEY = "kweY5BpuNdQaqKskYlsk7J_yEqurrxd2QWnognD9xNM";
const SECRET_KEY = "A5mkDqzje5weFW4s5UxfLYTzE5NLtUSDw0qOj4IIs34";
const BASE_URL   = "https://api.unsplash.com";
(() => {
    let images = [];

    const search = async (search_query) => {
        try {
            const fetch_config = {
                headers: {
                    Authorization: `Client-ID ${ACCESS_KEY}`,
                }
            };
            const res = await fetch(`${BASE_URL}/search/photos?query=${search_query}`, fetch_config);
            images = await res.json();
            images = images.results;
            disp();
        
        } catch(e) {
            console.log(e);
            console.log("Something is wrong in the search")
        }
    }

    (async () => {
        try {
            const current_location = window.location.href;
            const url_obj = new URL(current_location);
            const search_query = url_obj.searchParams.get("search_query");
            if(search_query == null || search_query == "") {
                const res = await fetch(`${BASE_URL}/photos/?client_id=${ACCESS_KEY}`);
                images = await res.json();
                disp();
            } else {
                search(search_query);
            }
        } catch(e) {
            console.log("Something messed up");
        }
    })();
    
    
    const disp = () => {
        const container = document.getElementById('container');
        container.innerHTML = "";
        images.forEach((elem) => {
            const img_loc = elem.links.download;
            const img_box = document.createElement('div');
            const img = document.createElement('img');
            img.src = img_loc;
            img_box.appendChild(img);

            container.appendChild(img_box);
        });
    }

})();