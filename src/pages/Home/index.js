import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShowLoader } from "../../redux/loaderSlice";
import { getAllDoctors } from "../../apicalls/doctors";
import { Col, message, Row } from "antd";

function Home() {
  const [doctors = [], setDoctors] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await getAllDoctors();
      if (response.success) {
        setDoctors(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(ShowLoader(false));
    } catch (error) {
      message.error(error.message);
      dispatch(ShowLoader(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <input placeholder="Search providers" className="w-400" />
        </div>
        <button
          className="outlined-btn"
          onClick={() => navigate("/apply-doctor")}
        >
          Apply for provider
        </button>
      </div>

      <Row gutter={[16, 16]} className="my-1">
        {doctors.map((doctor) => {
          return (
            <Col span={8}>
              <div
                className="bg-white p-1 flex flex-col gap-1 cursor-pointer"
                onClick={() => navigate(`/book-appointment/${doctor.id}`)}
              >
                <div className="flex justify-between w-full">
                  <h2 className="uppercase">
                    {doctor.firstname} {doctor.lastname}
                  </h2>
                </div>
                <hr />
                <div className="flex justify-between w-full">
                  <h4>
                    <b>Speciality:</b>
                  </h4>
                  <h4>{doctor.speciality}</h4>
                </div>
                <div className="flex justify-between w-full">
                  <h4>
                    <b>Experience:</b>
                  </h4>
                  <h4>
                    {doctor.experience}
                    Years
                  </h4>
                </div>
                <div className="flex justify-between w-full">
                  <h4>
                    <b>Email:</b>
                  </h4>
                  <h4>{doctor.email}</h4>
                </div>
                <div className="flex justify-between w-full">
                  <h4>
                    <b>Phone:</b>
                  </h4>
                  <h4>{doctor.phone}</h4>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Home;
