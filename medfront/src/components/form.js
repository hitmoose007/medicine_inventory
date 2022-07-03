import React from "react";
import { useState, useMemo } from "react";

const prepareForm = (formArr) => {
  return formArr.reduce((r, v) => ({ ...r, [v.name]: "" }), {});
};

export default function Form({
  title,
  formArr,
  submitBtn,
  onSubmit,
  redirect,
  url,
}) {
  const initialForm = useMemo(() => prepareForm(formArr), [formArr]);
  const [form, setForm] = useState(initialForm);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  };

  const onSumbitHandler = () => {
    console.log(form);
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        onSubmit(data);
        setForm(initialForm);
      })
      .catch((error) => console.log(error));
  };

  const onChangeHandler = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const hasRedirect = !!redirect;

  return (
    <div className=''>
      <form className=' bg-slate-200 w-2/5 m-auto p-7 rounded-md'>
        <h1 className=' text-4xl p-6 '>{title}</h1>
        {formArr.map(({ label, name, type }, index) => (
          <div key={index}>
            <label htmlFor={name}>{label}</label>
            <input
              className='border-2 border-gray-600 p-2 w-full'
              id={name}
              name={name}
              type={type}
              value={form[name]}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
        ))}

        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-4 px-4 rounded focus:outline-none focus:shadow-outline'
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            onSumbitHandler();
          }}
        >
          {submitBtn}
        </button>
      </form>
    </div>
  );
}

Form.defaultProps = {
  title: "Sign In",
  formArr: [
    {
      label: "label1",
      name: "email",
      type: "text",
    },
    {
      label: "label2",
      name: "password",
      type: "password",
    },
  ],
  isLoginForm: false,
  submitBtn: "Sign In",
  onSubmit: (form) => console.log(form),
  redirect: null,
};

//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   //we get the url through props according to register or login
//   function handleChange(event) {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => {
//       return {
//         ...prevFormData,
//         [name]: value,
//       };
//     });
//   }
//   function handleSubmit(event) {
//     event.preventDefault();
//     console.log(formData);
//     //post request hogi, according to the url
//   }
