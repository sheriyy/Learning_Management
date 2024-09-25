import { Section } from "@prisma/client";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

interface SectionListProps {
  items: Section[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}
const SectionList = ({ items, onReorder, onEdit }: SectionListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [sections, setSections] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setSections(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedSections = items.slice(startIndex, endIndex + 1);
    setSections(items);
    const bulkUpdateData = updatedSections.map((section, index) => ({
      id: section.id,
      position: items.findIndex((item) => item.id === section.id),
    }));
    onReorder(bulkUpdateData);
  };
  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`${
              sections.length > 0 ? "my-9" : "mt-8"
            } flex flex-col gap-6`}
          >
            {sections.map((section, index) => (
              <Draggable
                key={section.id}
                draggableId={section.id}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="flex items-center bg-[#0499fd] rounded-lg font-medium p-4"
                  >
                    <div {...provided.dragHandleProps}>
                      <Grip className="h-5 w-5 cursor-pointer mr-5 hover:text-[#0499fd]" />
                    </div>
                    {section.title}
                    <div className="ml-auto">
                      <Pencil
                        className="h-4 w-4 cursor-pointer hover:text-[#87ceeb]"
                        onClick={() => onEdit(section.id)}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SectionList;
