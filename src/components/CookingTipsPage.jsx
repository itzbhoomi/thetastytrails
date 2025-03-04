
import TopNav from "./TopNav";
import Footer from "./Footer";

export default function CookingTipsPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      
      <p className="pt-5 px-20">
      <h1> <b>Top Cooking Tips for Culinary Success</b></h1>
      <ol class="list-disc">
        <li>Always preheat your oven for even baking—5-10 minutes ensures consistent results for cakes and breads.</li>
        <li>Use a pinch of salt in sweet dishes to enhance flavors, balancing sweetness subtly.</li>
        <li>Keep knives sharp; a dull knife is more dangerous and tears food instead of cutting cleanly.</li>
        <li>Season in layers—add salt and pepper gradually while cooking for depth, not just at the end.</li>
        <li>Rest meat after cooking; 5-10 minutes lets juices redistribute for juicier steaks and roasts.
        </li>
        <li>Freeze herbs in olive oil for fresh flavor year-round—perfect for soups and sauces.",</li>    <li></li>Test baking soda/powder freshness by mixing with vinegar/lemon juice; it should fizz vigorously.",
        <li>Use a wooden spoon to prevent pasta from boiling over—rest it across the pot to break surface tension.",
        </li>    
        <li>Marinate proteins overnight for maximum flavor, but avoid acidic marinades too long to prevent mushiness.",
        </li>     
        </ol>
    </p>
      <Footer />
    </div>
  );
}