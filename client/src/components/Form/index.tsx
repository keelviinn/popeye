import React from "react";

import { routesFieldsStates, timeFieldsStates } from "./Form.constants";
import * as S from "./Form.styles";

export function Form({ route, time, handleStart, setGeoJson, setRoute, setTime }: FormProps) {
  return (
    <S.FormContainer onSubmit={handleStart}>
      <S.FieldSet>
        <S.Legend>Popeye road map</S.Legend>

        <S.InputWrapper>
          <S.Label htmlFor="address">Route: </S.Label>
          <S.InputSelect
            placeholder="Select the route to process"
            classNamePrefix="filter"
            value={route}
            options={routesFieldsStates}
            onChange={(event) => {
              setGeoJson(null);
              setRoute(event as Route);
            }}
          />
        </S.InputWrapper>

        <S.InputWrapper>
          <S.Label htmlFor="address">Time: </S.Label>
          <S.InputSelect
            placeholder="Select the time to process"
            classNamePrefix="filter"
            value={time}
            options={timeFieldsStates}
            onChange={(event) => setTime(event as Time)}
          />
        </S.InputWrapper>
      </S.FieldSet>

      <S.Button type="submit">
        Start
      </S.Button>
    </S.FormContainer>
  );
}
