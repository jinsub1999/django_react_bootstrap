import React, {useState} from "react";
import CSRFinput from "../CSRFInput";
import ErrorMsg from "../ErrorMsg";

const ProductForm = ({
  token,
  ...props
} : {
  token: string
}) => {
  const [data, setData] = useState({name: "", price: 0, content: ""});
  const ChangeData = (e : |React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  return (<form method="POST" action="http://localhost:8000/products/" className="m-3">
    <CSRFinput token={token}/>

    <ErrorMsg/>
    <div className="form-group m-3">
      <label htmlFor="name">Product name</label>
      <div className="col-sm-10">
        <input id="name" name="name" value={data.name} onChange={ChangeData} placeholder="Input your product." className="form-control"/>
      </div>
    </div>

    <div className="form-group m-3">
      <label htmlFor="price">Price</label>
      <div className="col-sm-10">
        <input type="number" id="price" value={data.price} name="price" onChange={ChangeData} className="form-control"/>
      </div>
    </div>

    <div className="form-group m-3">
      <label htmlFor="description">Description</label>
      <div className="col-sm-10">
        <textarea id="description" name="description" cols={30} rows={5} onChange={ChangeData} placeholder="Describe your product." className="form-control"></textarea>
      </div>
    </div>

    <div className="form-group m-3 d-flex flex-row-reverse">
      <button type="submit" className="btn btn-primary" onClick={() => {}}>
        SUBMIT
      </button>
    </div>
  </form>);
};

export default ProductForm;
