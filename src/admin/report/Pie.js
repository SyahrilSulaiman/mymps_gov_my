import React,{useState, useEffect} from 'react'
import {PieChart} from 'react-minimal-pie-chart'

function Pie(props) {
    const [show, setShow] = useState(true);

    let data = [];

    props.ages.map((obj) => {
        var randomColor = "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
        });

        let insert = {
        color: randomColor,
        title: obj.key,
        value: obj.votes,
        };

        data.push(insert);
    });

    const renderRows = props.ages.map((obj) => {
        return (
        <tr key={`group-${obj.key}`}>
            <td>{obj.key}</td>
            <td>{obj.votes}</td>
            <td>{obj.percentage >= 100 ? obj.percentage / 2 : obj.percentage}%</td>
        </tr>
        );
    });

    return (
        <div onClick={(e) => setShow(!show)}>
          <div className="inline-container">
            <h4>Age Demographic</h4>
            {/* {show ? <FaChevronDown /> : <FaChevronUp />} */}
          </div>
    
          {show ? (
            <> 
              <div className="chart-container">
                <PieChart
                  animate
                  animationDuration={500}
                  animationEasing="ease-out"
                  center={[50, 50]}
                  data={data}
                  lengthAngle={360}
                  lineWidth={15}
                  paddingAngle={0}
                  radius={50}
                  rounded
                  startAngle={0}
                  viewBoxSize={[100, 100]}
                  label={(data) => data.dataEntry.title}
                  labelPosition={65}
                  labelStyle={{
                    // fontSize: "10px",
                    // fontColor: "FFFFFA",
                    // fontWeight: "800",
                  }}
                />
              </div>
    
              <table>
                <thead>
                  <tr>
                    <th>Age Group</th>
                    <th>Votes</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>{renderRows}</tbody>
              </table>
            </>
          ) : null}
    
          <style>{`
            .chart-container {
              height: 200px;
              margin-left: auto;
              margin-right: auto;
              width: 200px;
            }
    
            .inline-container {
              align-items: center;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              width: 100%;
            }
    
            table {
              margin-left: auto;
              margin-right: auto;
              margin-top: 3em;
              table-layout: fixed;
              width: 90%;
            }
            table tr th {
              text-align: left;
              background: gray;
              color: white;
            }
          `}</style>
        </div>
      );
    };

export default Pie
