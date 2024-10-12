import { createContext, useContext, useMemo } from 'react';
import { defineAbilitiesFor } from '@/util/Abilities';
import { useEffect } from "react";
import { fetchRolesRequest } from "@/redux/slices/roleSlice";
import { useDispatch, useSelector } from "react-redux";
import { GetUserRole } from '@/app/api/user/GetUserRole';
import { useAuth } from './AuthContext';
const AbilityContext = createContext();

export function AbilityProvider({ children }) {
const dispatch  = useDispatch()
let {roles, id}  = useAuth()
// console.log("see current user roles :", roles, id)

useEffect(()  =>  {
dispatch(fetchRolesRequest)
}, [])

  const ability = useMemo(() => defineAbilitiesFor(roles, id), [roles, id]); // Corrected to use user
  // console.log("see user:", user);
  
  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}

export function useAbility() {
  const ability = useContext(AbilityContext);
  if (!ability) {
    throw new Error('useAbility must be used within an AbilityProvider');
  }
  return ability;
}
