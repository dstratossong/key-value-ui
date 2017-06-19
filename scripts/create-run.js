"use strict";

var api = new API(AJAXRequest, "http://hotellnx114.torolab.ibm.com:8080");

function selectServices(services) {
  // services-container
  var container = document.createElement("div");
  container.className = "services-container";

  // services-title
  var containerTitle = document.createElement("p");
  containerTitle.className = "services-title";
  containerTitle.appendChild(document.createTextNode("Services"));
  container.appendChild(containerTitle);

  // services
  var list = document.createElement("ul");
  list.className = "services";
  container.appendChild(list);

  Object.keys(services).forEach((key) => {
    new Service(list, key, services[key]);
  });

  // attach to DOM
  var outer = document.getElementById("select-services");
  outer.innerHTML = "";
  outer.appendChild(container);
}

class Service {

  constructor(parent, name, instances) {
    this.name = name;
    this.expanded = false;

    // service-container
    this.element = document.createElement("li");
    this.element.className = "service-container";

    // instances
    this.list = document.createElement("ul");
    this.list.className = "instances";
    this.list.style.display = "none";

    this.instances = [];
    instances.forEach((instance) => {
      // if (instance.status === "Ready") {
      this.instances.push(new Instance(this.list, instance));
      // }
    });

    // availability
    this.available = this.instances.length;

    // service-title
    let elementTitle = document.createElement("p");
    elementTitle.className = "service-title";
    elementTitle.appendChild(document.createTextNode(this.name));
    elementTitle.onclick = () => this.toggle();
    this.element.appendChild(elementTitle);

    // service-status
    let elementStatus = document.createElement("span");
    elementStatus.className = "service-status";
    elementStatus.appendChild(document.createTextNode(this.available + " instances ready"));
    elementTitle.appendChild(elementStatus);

    // attach to parent
    this.element.appendChild(this.list);
    parent.appendChild(this.element);
  }

  toggle() {
    // this.instances.forEach((instance) => instance.toggle());

    console.log(this);

    if (this.expanded) {
      this.list.style.display = "none";
      this.expanded = false;
    } else {
      this.list.style.display = "block";
      this.expanded = true;
    }
  }

}

class Instance {

  constructor(parent, instance, form) {
    // container
    this.instance = instance;
    this.link = document.createElement("a");
    this.link.onclick = () => console.log("AYYYYYYYY");

    let element = document.createElement("li");
    element.className = "instance-container";
    this.link.appendChild(element);

    // instance-title
    let elementTitle = document.createElement("p");
    elementTitle.className = "instance-title";
    elementTitle.appendChild(document.createTextNode(this.instance.Url + " @ " + this.instance.Version));
    element.appendChild(elementTitle);

    // instance-status
    let elementStatus = document.createElement("span");
    elementStatus.className = "instance-status";
    elementStatus.appendChild(document.createTextNode(this.instance.Status));
    elementTitle.appendChild(elementStatus);

    parent.appendChild(this.link);
  }

}
