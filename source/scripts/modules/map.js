async function initMap() {
  await ymaps3.ready;
  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    ymaps3;

  const map = new YMap(document.getElementById("map"), {
    location: {
      center: [39.024074, 45.070148],
      zoom: 16,
    },
  });

  const content = document.createElement("div");
  const marker = new YMapMarker(
    {
      coordinates: [39.024074, 45.070148],
      draggable: true,
    },
    content
  );
  content.innerHTML = `
  <div class="map__marker-wrapper">
    <div class="map__marker">
      <span class="visually-hidden">AngelaVladi</span>
      <svg class="map__logo" viewBox="0 0 100 50" width="150" height="75" xmlns="http://www.w3.org/2000/svg">
        <use xlink:href="images/sprite.svg#angelavladi-logo" />
      </svg>
      <p>Краснодар, ул. Восточно-Кругликовская, 65</p>
    </div>
  </div>
  `;

  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer({ zIndex: 1800 }));
  map.addChild(marker);
}

initMap();
