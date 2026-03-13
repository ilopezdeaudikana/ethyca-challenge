import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { useState } from 'react'
import styles from './FilterControls.module.css'
import { LayoutMode } from '../../types'
import { titleCase } from '../../utils/strings'
import { useSystemsData } from '../../hooks/useSystemsData'
import { useUiStore } from '../../store/useUiStore'

export const FilterControls = () => {
  const [useOpen, setUseOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const { allUses, allCategories } = useSystemsData()
  const layoutMode = useUiStore((state) => state.layoutMode)
  const setLayoutMode = useUiStore((state) => state.setLayoutMode)
  const selectedUses = useUiStore((state) => state.selectedUses)
  const selectedCategories = useUiStore((state) => state.selectedCategories)
  const setSelectedUses = useUiStore((state) => state.setSelectedUses)
  const setSelectedCategories = useUiStore((state) => state.setSelectedCategories)
  const resetFilters = useUiStore((state) => state.resetFilters)
  const clearSelection = useUiStore((state) => state.clearSelection)

  return (
    <>
      <div className={styles.topBarSection}>
        <h2>Layout</h2>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={layoutMode}
          className={styles.layoutToggle}
          onChange={(_, value) => {
            if (value) setLayoutMode(value)
          }}
        >
          <ToggleButton value={LayoutMode.SystemType}>
            <span className={styles.toggleLabel}>System type</span>
          </ToggleButton>
          <ToggleButton value={LayoutMode.DataUse}>
            <span className={styles.toggleLabel}>Data use</span>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div className={styles.topBarSection}>
        <div className={styles.controlHeader}>
          <h2>Filter by data use</h2>
        </div>
        <FormControl size="small" fullWidth className={styles.selectControl}>
          <InputLabel id="data-use-label">Data use</InputLabel>
          <Select
            labelId="data-use-label"
            multiple
            value={selectedUses}
            label="Data use"
            onChange={(event) => {
              clearSelection()
              setSelectedUses(typeof event.target.value === 'string' ? [] : event.target.value)
            }}
            open={useOpen}
            onOpen={() => setUseOpen(true)}
            onClose={() => setUseOpen(false)}
            onChangeCapture={() => setUseOpen(false)}
            renderValue={(selected) =>
              selected.length === 0 ? 'All' : selected.map((value) => titleCase(value)).join(', ')
            }
          >
            {allUses.map((use) => (
              <MenuItem key={use} value={use}>
                {titleCase(use)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={styles.topBarSection}>
        <h2>Filter by data categories</h2>
        <FormControl size="small" fullWidth className={styles.selectControl}>
          <InputLabel id="data-category-label">Data category</InputLabel>
          <Select
            labelId="data-category-label"
            multiple
            value={selectedCategories}
            label="Data category"
            onChange={(event) => {
              clearSelection()
              setSelectedCategories(
                typeof event.target.value === 'string' ? [] : event.target.value,
              )
            }}
            open={categoryOpen}
            onOpen={() => setCategoryOpen(true)}
            onClose={() => setCategoryOpen(false)}
            onChangeCapture={() => setCategoryOpen(false)}
            renderValue={(selected) =>
              selected.length === 0
                ? 'All'
                : selected.map((value) => titleCase(value)).join(', ')
            }
          >
            {allCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {titleCase(category)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={styles.resetSection}>
        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }} onClick={resetFilters}>
          Reset filters
        </Button>
      </div>
    </>
  )
}
