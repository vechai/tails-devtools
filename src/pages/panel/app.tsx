import React, { useCallback } from "react";

import { Autocomplete, Filter, Renderer, Config } from "./components";

import { useClassList } from "./hooks";
import { useSandbox } from "./context/sandbox";
import { ClassListProvider } from "./context/class";

const Panel = () => {
  const [autocompleteValue, setAutocompleteValue] = React.useState("");
  const [selectedClass, setSelectedClass] = React.useState("");

  const { saveHtml, suggestions, resolveColor, resolveClassName } =
    useSandbox();

  const {
    classList,
    inspectedEl,
    filterValue,
    copied,
    handleFilterChange,
    handleToggleClass,
    handleSetClassList,
    handleCopy,
  } = useClassList({
    onReset: () => {
      setAutocompleteValue("");
      setSelectedClass("");
    },
  });

  const handleHitEnter = useCallback(
    async (classList: string) => {
      saveHtml(classList);
      await handleSetClassList(classList);
    },
    [saveHtml, handleSetClassList]
  );
  return (
    <div className="relative flex max-h-full min-h-screen w-full flex-col overflow-hidden bg-white text-black dark:bg-neutral-800 dark:text-white">
      <Filter
        value={filterValue}
        copied={copied}
        onChange={handleFilterChange}
        onCopy={handleCopy}
      />
      <Autocomplete
        completions={suggestions}
        inputValue={autocompleteValue}
        onChange={setAutocompleteValue}
        onEnter={handleHitEnter}
      />

      <ClassListProvider
        inspectedEl={inspectedEl}
        classList={classList}
        onToggleClass={handleToggleClass}
        onResolveColor={resolveColor}
        onResolveClassName={resolveClassName}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
      >
        <Renderer />
      </ClassListProvider>

      <Config />
    </div>
  );
};

export default Panel;
