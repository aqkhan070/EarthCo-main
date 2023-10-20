<div className="badgeBox justify-content-center ">
<button
type="button"
onClick={(e) => {
setSelectedItem(e.target.values);
console.log("selected item is ", selectedItem);
}}
className="dispContents"       

>
<span className="actionBadge badge-success light border-0 badgebox-size">
<span className="material-symbols-outlined badgebox-size">create</span>
</span>
</button>
<span className="actionBadge badge-danger light border-0 badgebox-size">
  <span className="material-symbols-outlined badgebox-size ">
    delete
  </span>
</span>
</div>
