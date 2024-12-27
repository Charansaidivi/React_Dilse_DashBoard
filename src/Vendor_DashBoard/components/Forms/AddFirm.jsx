import React from 'react';
import { useState } from 'react';
import { API_URL } from '../../data/ApiPath';

const AddFirm = () => {
  const[firmName,setName] =useState("")
  const[area,setArea] =useState("")
  const[category,setCategory]= useState([])
  const[region,setRegion] = useState([])
  const[offer,setOffer]=useState("")
  const[image,setFile]=useState(null)
  const submitHandler= async(e)=>{
    e.preventDefault()
    try {
      const token= localStorage.getItem('loginToken')
      if(!token){
        console.log("error in token retrival")
      }
      const formData = new FormData()
      formData.append('firmName',firmName)
      formData.append('area',area)
      category.forEach((value)=>{
        formData.append('category',value)
      })
      region.forEach((value)=>{
        formData.append('region',value)
      })
      formData.append('offer',offer)
      if (image) {
        formData.append('image', image); // 'image' should match the backend's expected key
    } else {
      console.log("No image file selected");
    }
      const response = await fetch(`${API_URL}/firm/add-firm`,{
        method: 'POST',
        headers: {
          'token':`${token}`
        },
        body:formData
      })
      const data = await response.json()
      if(response.ok){
        console.log("firm added",data)
        localStorage.setItem("firmId",data.firmId)
        alert("firm added sucessfully")
        setName("")
        setArea("")
        setCategory([])
        setRegion([])
        setOffer("")
        setFile(null)
      }
      else if(data.msg ==="Vendor is allowed to add only one firm"){
        alert("only one resturant registration is allowed for one vendor")
      }
      else{
        console.log("error in adding firm")
        alert("some sever issue")
      }
      
    } catch (error) {
      console.log(error)
    }
  }
    const categoryHandler=(event)=>{
      const value=event.target.value
      if(category.includes(value)){
        setCategory(category.filter((item)=> item!== value))
      }
      else{
        setCategory([...category,value])
      }

    }
    const regionHandler=(event)=>{
      const value=event.target.value
      if(region.includes(value)){
        setRegion(region.filter((item)=> item!== value))
      }
      else{
        setRegion([...region,value])
      }

    }
    const handleImage=(event)=>{
      const selectedImage = event.target.files[0]
      setFile(selectedImage)
    }

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={submitHandler}>
        <h3>Add Firm</h3>
        <label>Firm Name</label>
        <input type="text" name="firmName" value={firmName} onChange={(e)=>setName(e.target.value)}/>
        <label>Area</label>
        <input type="text" name="area" value={area}  onChange={(e)=>setArea(e.target.value)} />
        <div className="checkInp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className="checboxContainer">
              <label>Veg</label>
              <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={categoryHandler}/>
            </div>
            <div className="checboxContainer">
              <label>Non-Veg</label>
              <input type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={categoryHandler} />
            </div>
          </div>
        </div>
        <label>Offer</label>
        <input type="text" name="offer" value={offer}  onChange={(e)=>setOffer(e.target.value)} />
        <div className="checkInp">
          <label>Region</label>
          <div className="inputsContainer">
            <div className="regBoxContainer">
              <label>South Indian</label>
              <input type="checkbox" checked={region.includes('south-indian')}  value="south-indian" onChange={regionHandler}  />
            </div>
            <div className="regBoxContainer">
              <label>North Indian</label>
              <input type="checkbox" checked={region.includes('north-indian')}  value="north-indian" onChange={regionHandler}/>
            </div>
            <div className="regBoxContainer">
              <label>Chinese</label>
              <input type="checkbox" checked={region.includes('chinese')}  value="chinese" onChange={regionHandler}/>
            </div>
            <div className="regBoxContainer">
              <label>Bakery</label>
              <input type="checkbox" checked={region.includes('bakery')}  value="bakery" onChange={regionHandler} />
            </div>
          </div>
        </div>
        <label>Firm Image</label>
        <input type="file" onChange={handleImage} />
        <br />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default AddFirm;
