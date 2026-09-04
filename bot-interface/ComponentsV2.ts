import {
  TextDisplayBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  ThumbnailBuilder,
  SectionBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  FileBuilder,
  AttachmentBuilder,
  MediaGalleryBuilder,
  MediaGalleryItemBuilder,
  ContainerBuilder,
  ComponentType,
  type APIComponentInContainer,
  type APIMessageTopLevelComponent,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  type MessageActionRowComponentBuilder,
  Message,
  TextChannel,
  MessageFlags,
} from "discord.js";
type WeakObj = {
  [key: string]: any;
};
console.log("Loading module fragment [ComponentsV2]");

//Todo: Add validation, return an error if malformed, image support

export namespace V2 {
  export namespace Parser {
    export namespace ActionRow {
      // holds the runForItemType function for action row constructing
      export function runForItemType(
        component: WeakObj,
        actionRow: ActionRowBuilder,
        children?: WeakObj[],
      ) {
        switch (component["Type"]) {
          case "Button": {
            addButton(component, actionRow);
            break;
          }

          case "SelectMenu": {
            addSelectMenu(component, actionRow, children);
            break;
          }
        }
      }
    }
    export namespace Section {
      // holds the runForItemType function for section constructing
      export function runForItemType(
        component: WeakObj,
        section: SectionBuilder,
      ) {
        switch (component["Type"]) {
          case "Text": {
            addText(component, section);
            break;
          }
          case "Button": {
            addButton(component, section);
            break;
          }
          case "Thumbnail": {
            addThumbnail(component, section);
            break;
          }
        }
      }
    }
    // Functions
    export function addSeparator(item: WeakObj, container: ContainerBuilder) {
      container.addSeparatorComponents(
        new SeparatorBuilder()
          .setDivider(item["Visible"])
          .setSpacing(
            item["Size"] === "Small"
              ? SeparatorSpacingSize.Small
              : SeparatorSpacingSize.Large,
          ), //filter the size, if its small, use that, if its large or undefined, use large
      );
    }
    export function addText(
      item: WeakObj,
      container: ContainerBuilder | SectionBuilder,
    ) {
      container.addTextDisplayComponents(
        new TextDisplayBuilder({
          content: item["Content"],
        }),
      );
    }
    export function addThumbnail(item: WeakObj, container: SectionBuilder) {
      container.setThumbnailAccessory(
        new ThumbnailBuilder({
          media: {
            url: item["Url"],
            width: item["Width"] ?? null,
            height: item["Height"] ?? null,
          },
        }),
      );
    }
    export function parseButtonStyle(style: string): ButtonStyle {
      switch (style) {
        case "Primary": {
          return ButtonStyle.Primary;
        }
        case "Secondary": {
          return ButtonStyle.Secondary;
        }
        case "Success": {
          return ButtonStyle.Success;
        }
        case "Danger": {
          return ButtonStyle.Danger;
        }
        case "Link": {
          return ButtonStyle.Link;
        }

        default: {
          return ButtonStyle.Primary;
        }
      }
    }
    export function parseComponentType(
      type: ComponentType | undefined,
    ): string {
      switch (type) {
        case ComponentType.ActionRow: {
          return "Action Row:";
        }
        case ComponentType.Button: {
          return "Button";
        }
        case ComponentType.StringSelect: {
          return "String Select";
        }
        case ComponentType.Checkbox: {
          return "Checkbox";
        }
        case ComponentType.CheckboxGroup: {
          return "Checkbox Group";
        }
        case ComponentType.Container: {
          return "Container";
        }
        case ComponentType.File: {
          return "File";
        }
        case ComponentType.FileUpload: {
          return "File Upload";
        }
        case ComponentType.Label: {
          return "Label";
        }
        case ComponentType.MediaGallery: {
          return "Gallery";
        }
        case ComponentType.UserSelect: {
          return "User Select";
        }
        case ComponentType.RadioGroup: {
          return "Radio Group";
        }
        case ComponentType.RoleSelect: {
          return "Role Select";
        }
        case ComponentType.ChannelSelect: {
          return "Channel Select";
        }
        case ComponentType.Thumbnail: {
          return "Thumbnail";
        }
        case ComponentType.TextInput: {
          return "Text Input";
        }
        case ComponentType.TextDisplay: {
          return "Text";
        }
        case ComponentType.Separator: {
          return "Separator";
        }
        case ComponentType.Section: {
          return "Section";
        }
        case ComponentType.MentionableSelect: {
          return "Mention Select";
        }
        case undefined:
        default: {
          return "N/A/N";
        }
      }
    }
    export function addButton(
      item: WeakObj,
      container: ActionRowBuilder | SectionBuilder,
    ) {
      const button = new ButtonBuilder()
        .setLabel(item["Label"])
        .setStyle(parseButtonStyle(item["Style"]));
      if (item["Id"] != undefined) {
        button.setCustomId(item["Id"]);
      }
      if (item["Url"] != undefined) {
        button.setURL(item["Url"]);
      }

      // check if the container argument is one of the following, as these all have different ways of adding a button
      if (container instanceof ActionRowBuilder) {
        container.addComponents(button);
      } else if (container instanceof SectionBuilder) {
        container.setButtonAccessory(button);
      }
      return button;
    }
    export function addSelectMenuOption(item: WeakObj) {
      // alias making select menu to remove the massive name and constructor
      return new StringSelectMenuOptionBuilder({
        label: item["Label"],
        value: item["Value"],
        description: item["Description"],
        emoji: item["Emoji"],
        default: item["Default"],
      });
    }
    export function addSelectMenu(
      item: WeakObj,
      container: ActionRowBuilder,
      children?: WeakObj[],
    ) {
      const selectMenu = new StringSelectMenuBuilder({
        custom_id: item["Id"],
        placeholder: item["Placeholder"],
        min_values: item["MinValues"],
        max_values: item["MaxValues"],
        options: item["Options"] ?? [],
        disabled: item["Disabled"],
        required: item["Required"],
        type: item["Type"],
      });

      if (children != undefined) {
        // add select options from the children param, can be anything thats valid syntax(model)
        children.forEach((child: WeakObj) => {
          selectMenu.addOptions(addSelectMenuOption(child));
        });
      }

      container.addComponents(selectMenu);
      return selectMenu;
    }
    export function addGalleryItems(item: WeakObj): MediaGalleryItemBuilder {
      return new MediaGalleryItemBuilder().setURL(item["Url"]);
    }
    export function addGallery(
      item: WeakObj,
      container: ContainerBuilder,
      children?: WeakObj[],
    ): MediaGalleryBuilder {
      const gallery = new MediaGalleryBuilder();
      if (children) {
        // if there are items in the children argument then use that instead
        children.forEach((value: WeakObj) => {
          gallery.addItems(addGalleryItems(value)); // add each item from the object as an image
        });
      } else {
        item["Media"].forEach((value: WeakObj) => {
          gallery.addItems(addGalleryItems(value));
        });
      }
      container.addMediaGalleryComponents([gallery]);
      return gallery;
    }
    export function runForItemType(
      item: WeakObj,
      container: ContainerBuilder,
      children?: WeakObj[],
    ) {
      switch (item["Type"]) {
        case "Text": {
          addText(item, container);
          break;
        }

        case "Separator": {
          addSeparator(item, container);
          break;
        }

        case "Gallery": {
          addGallery(item, container);
          break;
        }

        case "ActionRow": {
          const actionRow: ActionRowBuilder<MessageActionRowComponentBuilder> =
            new ActionRowBuilder();

          // loop through all components in an actionrow type component
          item["Content"].forEach((component: WeakObj) => {
            ActionRow.runForItemType(component, actionRow, children);
          });
          container.addActionRowComponents(actionRow);
          break;
        }

        case "Section": {
          const section = new SectionBuilder();
          item["Content"].forEach((component: WeakObj) => {
            Section.runForItemType(component, section);
          });

          container.addSectionComponents(section);
          break;
        }
      }
    }
  }
  export function Component(obj: WeakObj): ContainerBuilder {
    const Container = new ContainerBuilder();

    function has(attribute: string, callback: Function): boolean {
      if (obj.Embed[attribute] !== undefined) {
        callback();
        return true;
      }
      return false;
    }
    try {
      has("Accent", () => {
        if (typeof obj.Embed["Accent"] === "number") {
          Container.setAccentColor(obj.Embed["Accent"]);
        } else {
          Container.setAccentColor(parseInt(obj.Embed["Accent"]));
        }
      });

      // if there is a thumbnail element then only add the section, if there isnt, then this returns false and runs the content in the if
      if (
        !has("Thumbnail", () => {
          const thumbnailSection = new SectionBuilder();

          has("Title", () => {
            thumbnailSection.addTextDisplayComponents(
              new TextDisplayBuilder({
                content: obj.Embed["Title"],
              }),
            );
          });

          has("Description", () => {
            thumbnailSection.addTextDisplayComponents(
              new TextDisplayBuilder({
                content: obj.Embed["Description"],
              }),
            );
          });

          thumbnailSection.setThumbnailAccessory(
            new ThumbnailBuilder({
              media: {
                url: obj.Embed["Thumbnail"]["Url"],
                width: obj.Embed["Thumbnail"]["Width"],
                height: obj.Embed["Thumbnail"]["Height"],
              },
            }),
          );

          Container.addSectionComponents(thumbnailSection);
        })
      ) {
        has("Title", () => {
          Container.addTextDisplayComponents(
            new TextDisplayBuilder({
              content: obj.Embed["Title"],
            }),
          );
        });

        has("Description", () => {
          Container.addTextDisplayComponents(
            new TextDisplayBuilder({
              content: obj.Embed["Description"],
            }),
          );
        });
      }

      has("Content", () => {
        obj.Embed["Content"].forEach((item: WeakObj) => {
          // loop through all components and add them to container according to type
          Parser.runForItemType(item, Container, obj.Children);
        });
      });
    } catch (e) {
      Container.addTextDisplayComponents(
        new TextDisplayBuilder({
          content: "## An error occurred while trying to create component",
        }),
      )
        .addSeparatorComponents(
          new SeparatorBuilder()
            .setDivider(true)
            .setSpacing(SeparatorSpacingSize.Small),
        )
        .addTextDisplayComponents(
          new TextDisplayBuilder({
            content: `**Details + Stack Trace (if applicable)**:\n${e}`,
          }),
        );
    } finally {
      return Container;
    }
  }

  export function ComponentFromJSON(json: string): ContainerBuilder[] {
    try {
      return [Component(JSON.parse(json))];
    } catch (e: any) {
      try {
        return [
          Component(
            JSON.parse(json.replace("```json", "").replace("}```", "}")),
          ),
        ];
      } catch (e2: any) {
        return [
          Component({
            //Todo: Streamline the error creation system, maybe move them into here and wrap them in Errors.ts
            Embed: {
              Title: "## An error occurred while parsing your data",
              Description:
                "**Details + Trace (if applicable)**:\n" + e.toString(),
            },
          }),
          Component({
            //Todo: Streamline the error creation system, maybe move them into here and wrap them in Errors.ts
            Embed: {
              Title: "## An error occurred while parsing your data (attempt 2)",
              Description:
                "**Details + Trace (if applicable)**:\n" + e2.toString(),
            },
          }),
        ];
      }
    }
  }

  export function AddSelectOptions(
    component: ContainerBuilder,
    options: WeakObj,
  ) {
    component.components.find((c) => {
      // loop through all items in the component until we find an actionrow
      if (c.data.type !== ComponentType.ActionRow) return;
      c.data.components?.find((i) => {
        // loop throuh evertything in the actionrow
        if (i.type !== ComponentType.StringSelect) return;

        if (i.options.length > 25) {
          throw new RangeError(
            `Component of type SelectMenu cannot have more than 25 options. You have ${i.options.length} options.`,
          );
        }

        options.forEach((item: WeakObj) => {
          // for ever item in the actionrow, create a new option and add it to the selectmenu
          i.options.push(Parser.addSelectMenuOption(item).toJSON());
          console.log(item);
        });
        console.log(i.options);
      });
      console.log(c.data.components);
    });

    return component;
  }

  export namespace Prefabs {
    export function TitleOnly(content: string): ContainerBuilder {
      return Component({ Embed: { Title: content } });
    }
    export function TitleDetailed(
      content: string,
      desc: string,
    ): ContainerBuilder {
      return Component({ Embed: { Title: content, Description: desc } });
    }
    export function AccentedTitleDetailed(
      content: string,
      desc: string,
      accent: number,
    ): ContainerBuilder {
      return Component({
        Embed: { Title: content, Description: desc, Accent: accent },
      });
    }
    export function AccentedTitleOnly(
      content: string,
      accent: number,
    ): ContainerBuilder {
      return Component({ Embed: { Title: content, Accent: accent } });
    }
    export function TitleWithThumbnail(
      content: string,
      url: string,
    ): ContainerBuilder {
      return Component({
        Embed: {
          Content: [
            {
              Type: "Section",
              Content: [
                { Type: "Text", Content: content },
                { Type: "Thumbnail", Url: url },
              ],
            },
          ],
        },
      });
    }
    export function TitleDescWithImage(
      title: string,
      content: string,
      url: string,
    ): ContainerBuilder {
      return Component({
        Embed: {
          Content: [
            { Type: "Text", Content: title },
            { Type: "Text", Content: content },
            {
              Type: "Gallery",
              Media: [{ Url: url }],
            },
          ],
        },
      });
    }
    export function AccentedTitleWithThumbnail(
      content: string,
      url: string,
      accent: number,
    ): ContainerBuilder {
      return Component({
        Embed: {
          Accent: accent,
          Content: [
            {
              Type: "Section",
              Content: [
                { Type: "Text", Content: content },
                { Type: "Thumbnail", Url: url },
              ],
            },
          ],
        },
      });
    }
  }

  export class CV2ToJSONObject {
    //* Unimplemented, trying another method first
    private CV2Input: undefined;
    constructor() {}
  }
}
