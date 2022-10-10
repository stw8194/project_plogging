import styled from "styled-components";
import { useTable } from "react-table";
import { useMemo, useEffect, useState } from "react";
import testDoream from "../../test_data/dodream.json";

interface Tableprops {
  columns: any;
  data: any;
}

function Table({ columns, data }: Tableprops) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    // @ts-ignore
    columns,
    data,
  });
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function WalkTable({ dodream }: { dodream: any }) {
  const columns = useMemo(
    () => [
      {
        Header: "지역",
        accessor: "area_gu",
      },
      {
        Header: "이름",
        accessor: "course_name",
      },
      {
        Header: "유형",
        accessor: "course_category_nm",
      },
      {
        Header: "코스레벨",
        accessor: "course_level",
      },
      {
        Header: "거리",
        accessor: "distance",
      },
      {
        Header: "소요시간",
        accessor: "lead_time",
      },
    ],
    [],
  );
  const { data: test } = testDoream;
  const [newDodream, setNewDodream] = useState<any | null>([]);
  useEffect(() => {
    test.map((road: any) => {
      const nameArr = Object.keys(road.course_name) as any[];
      nameArr.map((name, index) => {
        // console.log(road.course_category_nm, index, name);
        const course_category_nm = road.course_category_nm;
        const course_name = name;
        const distance = road.course_name[name][0].distance;
        const area_gu = road.course_name[name][0].area_gu;
        const lead_time = road.course_name[name][0].lead_time;
        const course_level = road.course_name[name][0].course_level;
        const newRoad = { course_category_nm, course_name, distance, area_gu, lead_time, course_level };

        // console.log(course_category_nm, course_name, distance);
        setNewDodream((prev: any) => {
          return [...prev, newRoad];
        });
      });
    });
  }, []);

  if (!newDodream) return null;
  return (
    <Styles>
      <Table columns={columns} data={newDodream} />
    </Styles>
  );
}

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;
