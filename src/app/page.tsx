"use client";
import { useState } from 'react';
import { MenuButton } from "@/components/Buttons";
import { AppBar, Grid, Toolbar } from "@mui/material";

export default function Home() {

  const [ openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => setOpenMenu(true);

  return (
    <div className="flex items-center justify-center bg-slate-100">
      
      {/* < DebtsList /> */}
      <AppBar>
        <Toolbar>
          <Grid container >
            <Grid >
              <MenuButton
                onDataChanged={handleOpenMenu}
              >

              </MenuButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
    );
}
