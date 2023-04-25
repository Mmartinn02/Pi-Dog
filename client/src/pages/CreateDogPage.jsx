import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postDog } from "../Redux/Actions";
import styles from "./CreateDogPage.module.css";

function validateForm(input) {
  let errors = {};

  // NAME
  if (!input.name) {
    errors.name = "You must type a name";
  } else {
    errors.name = "";
  }

  // WEIGHTS
  if (!input.weight_min) {
    // weight min
    errors.weight_min = "Type a valid minimal weight number";
  } else if (!/\d{1,2}/gi.test(input.weight_min)) {
    errors.weight_min = "Weight must have min values. Example: '25'";
  } else {
    errors.weight_min = "";
  }
  if (!input.weight_max) {
    // weight max
    errors.weight_max = "Type a valid maxim weight number";
  } else if (!/\d{1,2}/gi.test(input.weight_max)) {
    errors.weight_max = "Weight must have max values. Example: '25'";
  } else {
    errors.weight_max = "";
  }
  // HEIGHTS
  if (!input.height_min) {
    // height min
    errors.height_min = "Type a valid minimal height number";
  } else if (!/\d{1,2}/gi.test(input.height_min)) {
    errors.height_min = "Height must have min values. Example: '25'";
  } else {
    errors.height_min = "";
  }
  if (!input.height_max) {
    // height max
    errors.height_max = "Type a valid maxim height number";
  } else if (!/\d{1,2}/gi.test(input.height_max)) {
    errors.height_max = "Height must have max values. Example: '25'";
  } else {
    errors.height_max = "";
  }
  return errors;
}

export const CreateDogPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const Temperament = useSelector((state) => state.temperaments)
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    image:"",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    Temperament: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      Temperament: [...input.Temperament, e.target.value],
    });
  }

  function handleDelete(el) {
    setInput({
      ...input,
      Temperament: input.Temperament.filter((temp) => temp !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !errors.name &&
      !errors.image &&
      !errors.weight_min &&
      !errors.height_min &&
      !errors.weight_max &&
      !errors.height_max
    ) {
      alert("Your dog has been created successfully");
      dispatch(postDog(input));
      setInput({
        name: "",
        image:"",
        height_min: "",
        weight_min: "",
        height_max: "",
        weight_max: "",
        life_span: "",
        Temperament: [],
      });
    } else {
      return alert("Something went wrong. Please try again.");
    }
    history.push("/home");
  }

  return (
    <Fragment>
      <div className={styles.mainContainerCreation}>
        <div>
          <h2>Create your Woof</h2>
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.Section}>
              <label>Name:</label>
              <input
                type="text"
                value={input.name}
                name="name"
                placeholder="Grand Canadian Bulldog"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.name}</p>
              </div>
            </div>
            <div className={styles.Section}>
              <label>Image URL:</label>
              <input
                type="url"
                value={input.image}
                name="image"
                placeholder="http://myimageontheweb.com"
                onChange={(e) => handleChange(e)}
              />
              <div>
                <p className={styles.error}>{errors.image}</p>
              </div>
            </div>
            <div className={styles.Section}>
              <h4>Heights</h4>
              <label>Min</label>
              <input
                type="number"
                value={input.height_min}
                name="height_min"
                placeholder="20"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.height_min}</p>
              </div>
              <label>Max</label>
              <input
                type="number"
                value={input.height_max}
                name="height_max"
                placeholder="50"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.height_max}</p>
              </div>
            </div>
            <div className={styles.Section}>
              <h4>Weights</h4>
              <label>Min</label>
              <input
                type="number"
                value={input.weight_min}
                name="weight_min"
                placeholder="15"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.weight_min}</p>
              </div>
              <label>Max</label>
              <input
                type="number"
                value={input.weight_max}
                name="weight_max"
                placeholder="32"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.weight_max}</p>
              </div>
            </div>
            <div className={styles.Section}>
              <label>Life Span</label>
              <input
                type="text"
                value={input.life_span}
                name="life_span"
                placeholder="12 - 15 years"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styles.Section}>
              <label>Temperaments</label>
              <select onChange={(e) => handleSelect(e)} className={styles.styled_select}>
                {Temperament.map((temp) => {
                  return (
                    <option key={temp.name} value={temp.name} name={temp.name}>
                      {temp.name}
                    </option>
                  );
                })}
              </select>
              <div className={styles.sidebar_box}>
                <h4>You have selected that:</h4>
                {input.Temperament.map((el) => (
                  <div key={el} className={styles.selectedItems}>
                    <p>{el}</p>
                    <button onClick={() => handleDelete(el)}>x</button>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.buttonSection}>
              <Link to="/home">
                <button className={styles.buttonCancel}>Cancel</button>
              </Link>
              <button className={styles.button} type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
