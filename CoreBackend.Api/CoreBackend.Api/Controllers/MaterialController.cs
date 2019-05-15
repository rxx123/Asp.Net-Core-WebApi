using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CoreBackend.Api.Dtos;
using CoreBackend.Api.Repositories;
using CoreBackend.Api.Services;
using Microsoft.AspNetCore.Mvc;
using NLog;

namespace CoreBackend.Api.Controllers
{
    [Route("api/product")] // 和主Model的Controller前缀一样
    public class MaterialController : Controller
    {
        private readonly IProductRepository _productRepository;
        public MaterialController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet("{productId}/materials")]
        public IActionResult GetMaterials(int productId)
        {
            //var product = ProductService.Current.Products.SingleOrDefault(x => x.Id == productId);
            //if (product == null)
            //{
            //    return NotFound();
            //}
            //return Ok(product.Materials);
            
            var product = _productRepository.ProductExist(productId);
            if (!product)
            {
                return NotFound();
            }
            var materials = _productRepository.GetMaterialsForProduct(productId);
            var results = Mapper.Map<IEnumerable<MaterialDto>>(materials);
            return Ok(results);
        }

        [HttpGet("{productId}/materials/{id}")]
        public IActionResult GetMaterial(int productId, int id)
        {
            //var product = ProductService.Current.Products.SingleOrDefault(x => x.Id == productId);
            //if (product == null)
            //{
            //    return NotFound();
            //}
            //var material = product.Materials.SingleOrDefault(x => x.Id == id);
            //if (material == null)
            //{
            //    return NotFound();
            //}
            //return Ok(material);

            var product = _productRepository.ProductExist(productId);
            if (!product)
            {
                return NotFound();
            }
            var material = _productRepository.GetMaterialForProduct(productId, id);
            if (material == null)
            {
                return NotFound();
            }
            var result = Mapper.Map<MaterialDto>(material);
            return Ok(result);
        }
    }
}