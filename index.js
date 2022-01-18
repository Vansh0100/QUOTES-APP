globaldata = [];

const collectFormData = () => {
  const formData = {
    id: `${Date.now()}`,
    category: document.getElementById("Category").value,
    imageUrl: document.getElementById("ImageUrl").value,
    quote: document.getElementById("Quote").value,
    writer: document.getElementById("Writer").value,
  };
  console.log(formData);
  const insertQuote = document.getElementById("quoteCard");
  insertQuote.insertAdjacentHTML("beforeend", quoteCard(formData));

  globaldata.push(formData);
  localStorageSave();
   clearformdata();
};
const clearformdata=()=>{
  document.getElementById("Category").value='',
   document.getElementById("ImageUrl").value='',
   document.getElementById("Quote").value='',
   document.getElementById("Writer").value=''
}
const quoteCard = ({ id, category, imageUrl, quote, writer }) =>
  `<div class="col-sm-12 col-md-6 col-lg-4 mt-3" id="${id}" key="${id}">
<div class="card" >
            <div class="card-header text-capitalize"><span>${category}</span>
                <button class="btn btn-outline-danger float-end" onclick=deleteQuote(this) id="${id}">
                    <i class="fa fa-trash"></i>
                </button>
                <button class="btn btn-outline-info float-end" onclick=editTask(this) id="${id}">
                    <i class="fa fa-pencil"></i>
                </button>
               
            </div>
            <img src=${imageUrl}
            class="card-img-top" alt="..." />
            <div class="card-body">
                <figure>
                    <blockquote class="blockquote">
                      <p><i class="fa fa-quote-left"></i>
                    <span>${quote}</span>
                    <i class="fa fa-quote-right"></i>
                    </p>
                    </blockquote>
                    <figcaption class="blockquote-footer">
                        Written by <cite title="Source Title">${writer}</cite>
                      </figcaption>
                  </figure>
            </div>
            <div class="card-footer d-none">
            <button class=" btn btn-outline-success rounded-pill float-end" onclick=saveEditedData(this) id="${id}">Save Changes</button>
            </div>
          </div>
          </div>
`;
const localStorageSave=()=>{
    localStorage.setItem("QuoteData",JSON.stringify({data:globaldata}));
}

const reloadStorageSave=()=>{
    const findItem=JSON.parse(localStorage.getItem("QuoteData"));
    const insertQuote = document.getElementById("quoteCard");
    console.log(findItem["data"]);
    if(findItem){
        globaldata=findItem["data"];
    }
    console.log(globaldata)
    globaldata.map((card)=>{
        insertQuote.insertAdjacentHTML('beforeend',quoteCard(card));
    })
    // window.location.reload()
}
const deleteQuote=(event)=>{
  const targetid=event.id;
  console.log(targetid);
  const modifyGlobalArray=globaldata.filter((card)=>{
    return card.id!=targetid;
  })
  console.log(modifyGlobalArray)
  console.log(globaldata);
  globaldata=modifyGlobalArray;
  console.log(globaldata);

  localStorageSave();
  window.location.reload();
}
const editTask=(event)=>{
  const targetid=event.id;
  console.log(targetid);
  // console.log(event.parentNode.parentNode.childNodes[5].childNodes[1])
  event.parentNode.parentNode.childNodes[1].contentEditable=true;
  event.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[1].childNodes[1].childNodes[2].contentEditable=true;
  event.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[3].childNodes[1].contentEditable=true;
  // console.log(event.parentNode.parentNode.childNodes[7])
  // var button=document.createElement("button");
  // button.innerHTML="Save Changes";
  // event.parentNode.parentNode.childNodes[7].appendChild(button);
  // event.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("class","display-block")
  event.parentNode.parentNode.childNodes[7].setAttribute("class","card-footer")
}
const saveEditedData=(event)=>{
  const targetid=event.id;
  // const newQuote=event.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML;
  // console.log(event.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[1].childNodes[1].childNodes[2].innerHTML);
  // console.log(event.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[3].childNodes[1].innerHTML);
  const newCategory=event.parentNode.parentNode.childNodes[1].childNodes[0].innerHTML;
  const newQuote=event.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[1].childNodes[1].childNodes[2].innerHTML;
  const newWriter=event.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[3].childNodes[1].innerHTML;
  console.log(newCategory);
  console.log(newQuote);
  console.log(newWriter);
  event.parentNode.parentNode.childNodes[7].setAttribute("class","d-none");
  event.parentNode.parentNode.childNodes[1].contentEditable=false;
  event.parentNode.parentNode.childNodes[5].childNodes[1].contentEditable=false;
  const newData={
    category:newCategory,
    quote:newQuote,
    writer:newWriter,
  }
  console.log(globaldata);
  globaldata.forEach((e)=>{
    if(e.id==targetid){
      e.category=newCategory;
      e.quote=newQuote;
      e.writer=newWriter;
    }
  })
  localStorageSave();
}