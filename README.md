# Scala Take Home

1. What information can you provide about the image
    1. I ended up grabbing the date, image_url, title and I did grab the item details like call_number and contributors
2. Can you use thumbnails?
    1. Yeah, I ended just implementing cards using their images but a thumbnail could just be a image button
3. Links to the image?
    1. Links to the image are provided in the response
4. What type of searching do you want to support?
    1. I ended up support searching using filters
    2. Its possible to do auto suggest using /search/suggest and doing a debounce on the text input that fetches after some time elapses
5. Is it possible to do fuzzy string matching
    1. Didn't see that this is possible
6. What about excluding certain results when searching?
    1. You can exclude resources using the filters
    2. You can exclude properties in your response using the At query
