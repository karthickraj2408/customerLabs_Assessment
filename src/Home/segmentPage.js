import React, { useState } from "react";
import { FaAngleLeft, FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";

// import "./style.css";

const SegmentPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [blueBoxSchemas, setBlueBoxSchemas] = useState([]);

  const schemaOptions = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  const showPopupHandler = () => {
    setShowPopup(true);
  };

  const closePopupHandler = () => {
    setShowPopup(false);
  };

  const addNewSchemaHandler = () => {
    if (selectedSchema) {
      if (!blueBoxSchemas.includes(selectedSchema)) {
        setBlueBoxSchemas((prevSchemas) => [...prevSchemas, selectedSchema]);
        setSelectedSchema("");
        
      }
    }
  };
  const handleBlueBoxSchemaChange = (index, event) => {
    const newSchemas = [...blueBoxSchemas];
    newSchemas[index] = event.target.value;
    setBlueBoxSchemas(newSchemas);
  };

  const handleSchemaChange = (event) => {
    setSelectedSchema(event.target.value);
  };

  const saveSegmentHandler = async () => {
    try {
      const segmentData = {
        segment_name: segmentName,
        schema: blueBoxSchemas.map((schema) => ({ [schema]: schema })),
      };

      console.log("test",segmentData);

      const response = await axios.post(
        "https://webhook.site/28473c9a-9526-4f3c-af5d-90657a0b25f2",
        segmentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to save segment");
      }

      console.log("Segment saved successfully!");
      closePopupHandler();
    } catch (error) {
      console.error("Error saving segment:", error.message);
    } finally {
      setSegmentName("");
      setBlueBoxSchemas([])
    }
  };
  const deleteSchemaHandler = (index) => {
    const newSchemas = [...blueBoxSchemas];
    newSchemas.splice(index, 1);
    setBlueBoxSchemas(newSchemas);
  };

  return (
    <div className="bg-opacity-20 -z-10 h-screen ">
      <div className="save-segment flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-5 sm:h-screen ">
        <div className="z-10 w-3/4 flex justify-center">
          <button
            onClick={showPopupHandler}
            className="save-segment-button bg-transparent border-white border p-3"
          >
            Save Segment
          </button>
        </div>

        <div className="w-1/4 sm:w-auto h-screen m-0 bg-white flex justify-between shadow ">
          {showPopup && (
            <div className=" bg-white  rounded-md  max-w-lg  h-screen flex flex-col justify-between m-0 w-full">
              <div className="popup-header  mb-4 bg-green-500 p-2 py-3">
                <p className="popup-header-text flex items-center">
                  <FaAngleLeft
                    onClick={closePopupHandler}
                    className="left-icon cursor-pointer mr-2"
                  />
                  Saving Segment
                </p>
              </div>
              <div>
                <div className="px-4">
                  <label
                    htmlFor="segmentName"
                    className="input-label block mb-2"
                  >
                    Enter the Name of the Segment
                  </label>
                  <input
                    type="text"
                    id="segmentName"
                    placeholder="Enter Segment Name"
                    value={segmentName}
                    onChange={(e) => setSegmentName(e.target.value)}
                    className="input-text border p-2 w-full mb-4"
                  />

                  <div className="blue-box mb-4 flex flex-col  ">
                    {blueBoxSchemas.map((schema, index) => (
                      <div className="flex border border-indigo-600 px-2 py-2">
                        <select
                          key={index}
                          className="schema-dropdown input-text border p-2 w-full mb-2"
                          value={schema}
                          onChange={(event) =>
                            handleBlueBoxSchemaChange(index, event)
                          }
                        >
                          {schemaOptions.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                              disabled={blueBoxSchemas.includes(option.value)}
                              className="dropdown-content"
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <div
                          className="flex items-center  border border-black p-2 mx-2  mb-2 cursor-pointer"
                          onClick={() => deleteSchemaHandler(index)}
                        >
                          <FaMinus />
                        </div>
                      </div>
                    ))}
                  </div>

                  <select
                    id="addSchema"
                    value={selectedSchema}
                    onChange={handleSchemaChange}
                    className="input-text border p-2 w-full mb-4"
                  >
                    <option value="">Add schema to segment</option>
                    {schemaOptions.map((schema) => (
                      <option key={schema.value} value={schema.value}>
                        {schema.label}
                      </option>
                    ))}
                  </select>
                  <p
                    onClick={addNewSchemaHandler}
                    className="add-new-schema text-green-500 cursor-pointer flex items-center mb-4 underline"
                  >
                    <FaPlus className="mr-2 underline" />
                    Add new schema
                  </p>
                </div>
              </div>

              <div className="popup-footer flex  gap-2 bg-gray-300 pt-3 pb-3 px-2">
                <button
                  className="footer-button-1 bg-blue-500 text-white p-2 rounded-md"
                  onClick={saveSegmentHandler}
                >
                  Save the Segment
                </button>
                <button
                  className="footer-button-2 bg-white p-2 rounded-md"
                  onClick={closePopupHandler}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SegmentPage;
